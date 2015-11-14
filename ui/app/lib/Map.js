sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Control",
    "sap/ui/thirdparty/d3"
], function (jQuery, Control) {
    "use strict";

    /**
     * Constructor for a new Map.
     *
     * @param {string} [sId]       id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * The Map control wraps the Google Map.
     * @extends sap.ui.core.Control
     *
     * @constructor
     * @alias bmvi.ui.app.lib.Map
     */
    var MapControl = Control.extend("bmvi.ui.app.lib.Map", {
        metadata: {
            library: "bmvi.ui.app.lib",
            properties: {
                /**
                 * Center of the Map.
                 */
                center: {
                    type: "bmvi.ui.app.lib.Position",
                    group: "Appearance"
                },
                /**
                 * Height of the Map.
                 */
                height: {
                    type: "sap.ui.core.CSSSize",
                    group: "Appearance",
                    defaultValue: "100%"
                },
                /**
                 * Whether to show an KML overlay.
                 */
                kml: {
                    type: "boolean",
                    group: "Appearance",
                    defaultValue: false
                },
                /**
                 * Lines on the Map.
                 */
                lines: {
                    type: "string[]",
                    group: "Appearance",
                    defaultValue: []
                },
                /**
                 * Whether to simplify the Map features.
                 */
                simplified: {
                    type: "boolean",
                    group: "Appearance",
                    defaultValue: false
                },
                /**
                 * Width of the Map.
                 */
                width: {
                    type: "sap.ui.core.CSSSize",
                    group: "Appearance",
                    defaultValue: "100%"
                },
                /**
                 * Zoom of the Map.
                 */
                zoom: {
                    type: "int",
                    group: "Appearance"
                }
            },
            defaultAggregation: "markers",
            aggregations: {
                /**
                 * List of Drivers on this Map.
                 */
                drivers: {
                    type: "bmvi.ui.app.lib.Driver",
                    multiple: true,
                    singleName: "driver"
                },
                /**
                 * List of Markers on this Map.
                 */
                markers: {
                    type: "bmvi.ui.app.lib.Marker",
                    multiple: true,
                    singleName: "marker"
                },
                /**
                 * Route on this Map.
                 */
                routes: {
                    type: "bmvi.ui.app.lib.Route",
                    multiple: true,
                    singleName: "route"
                }
            }
        }
    });

    Map.decodePosition = function (sPosition) {
        var aPosition = sPosition.split(",").map(function (sCoord) {
            return parseFloat(sCoord);
        });
        return {
            lat: aPosition[0],
            lng: aPosition[1]
        };
    };

    Map.decodePositions = function (aPositions) {
        return aPositions.map(function (sPosition) {
            return Map.decodePosition(sPosition);
        });
    };

    /**
     * Initializes the Map Control.
     * @override
     */
    MapControl.prototype.init = function () {
        this._oDirectionsService = new google.maps.DirectionsService();
        this._d3scale = function (val) {
            var greenToYellow = d3.scale.linear()
                .domain([0, 0.55])
                .interpolate(d3.interpolateRgb)
                .range(["#00ff00", "#faff00"]);

            var yellowToRed = d3.scale.linear()
                .domain([0, 0.55])
                .interpolate(d3.interpolateRgb)
                .range(["#faff00", "#ff0000"]);
            if (val < 0.25) {
                return greenToYellow(val);
            }
            return yellowToRed(val);
        };
    };

    /**
     * Function is called when the rendering of the control is completed.
     * Creates the Google Map and places it in the DOM.
     * @override
     */
    MapControl.prototype.onAfterRendering = function () {
        if (!(this.getCenter() && this.getZoom())) {
            return;
        }

        var aStyles = [
            {
                featureType: "poi",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            }
        ];

        if (this.getSimplified()) {
            aStyles = this.getModel("mapstyle").getProperty("/");
        }

        var oMap = new google.maps.Map(this.getDomRef(), {
            center: Map.decodePosition(this.getCenter()),
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            styles: aStyles,
            zoom: this.getZoom()
        });

        window.map = oMap;

        if (this.getKml()) {
            this._oLayer = new google.maps.KmlLayer({
                map: oMap,
                preserveViewport: true,
                url: "https://www.dropbox.com/s/a7v4unrbej8ogv4/bayern.kml?raw=1"
            });
        }

        this.getMarkers().forEach(function (oMarker) {
            oMarker.googleMarker = new google.maps.Marker({
                position: Map.decodePosition(oMarker.getPoint()),
                map: oMap,
                title: oMarker.getTitle()
            });
        }, this);

        this.getLines().forEach(function (mLine) {
            var oPolyline = new google.maps.Polyline({
                path: google.maps.geometry.encoding.decodePath(mLine.line),
                strokeColor: this._d3scale(mLine.usage || 0.4),
                strokeOpacity: 0.8,
                map: oMap
            });
            google.maps.event.addListener(oPolyline, "click", function (oEvent) {
                new google.maps.InfoWindow({
                    disableAutoPan: true,
                    content: mLine.name + "<br />" + ((mLine.usage || 0.4) * 4 * 0.11).toFixed(2) + "€/km",
                    map: oMap,
                    position: oEvent.latLng
                });
            });
        }, this);

        this.getRoutes().forEach(function (oRoute) {
            this._oDirectionsService.route({
                destination: Map.decodePosition(oRoute.getEnd()),
                origin: Map.decodePosition(oRoute.getStart()),
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: Map.decodePositions(oRoute.getPoints() || []).map(function (mPoint) {
                    return {
                        location: mPoint
                    };
                })
            }, jQuery.proxy(function (oDirectionsResult) {
                return new google.maps.DirectionsRenderer({
                    directions: oDirectionsResult,
                    map: oMap,
                    polylineOptions: {
                        strokeColor: oRoute.getType()
                    },
                    preserveViewport: true,
                    suppressMarkers: true
                });
            }, this));
            if (oRoute.getWindow()) {
                oRoute.infoWindow = new google.maps.InfoWindow({
                    disableAutoPan: true,
                    position: Map.decodePosition(oRoute.getWindow().position),
                    map: oMap,
                    content: this._getContentHtml(oRoute.getWindow().data)
                });
            }
        }, this);

        this.getDrivers().forEach(function (oDriver) {
            oDriver.infoWindow = new google.maps.InfoWindow({
                disableAutoPan: true,
                position: Map.decodePosition(oDriver.getPoint()),
                map: oMap,
                content: oDriver.getName()
            });
        }, this);
    };

    MapControl.prototype._getContentHtml = function (mData) {
        var sHtml = "";
        sHtml += "<div class='row'>";
        sHtml += "<span class='labelColumn'>";
        sHtml += this.getModel("i18n").getResourceBundle().getText("WINDOW_BASE");
        sHtml += "</span>";
        sHtml += "<span class='valueColumn'>";
        sHtml += mData.base;
        sHtml += "</span>";
        sHtml += "</div>";

        sHtml += "<div class='row'>";
        sHtml += "<span class='labelColumn'>";
        sHtml += this.getModel("i18n").getResourceBundle().getText("WINDOW_AXLES");
        sHtml += "</span>";
        sHtml += "<span class='valueColumn'>";
        sHtml += mData.axles;
        sHtml += "</span>";
        sHtml += "</div>";

        sHtml += "<div class='row'>";
        sHtml += "<span class='labelColumn'>";
        sHtml += this.getModel("i18n").getResourceBundle().getText("WINDOW_WHEATHER");
        sHtml += "</span>";
        sHtml += "<span class='valueColumn'>";
        sHtml += mData.wheather;
        sHtml += "</span>";
        sHtml += "</div>";

        sHtml += "<div class='row'>";
        sHtml += "<span class='labelColumn'>";
        sHtml += this.getModel("i18n").getResourceBundle().getText("WINDOW_TRAFFIC");
        sHtml += "</span>";
        sHtml += "<span class='valueColumn'>";
        sHtml += mData.traffic;
        sHtml += "</span>";
        sHtml += "</div>";

        sHtml += "<div class='row'>";
        sHtml += "<span class='labelColumn'>";
        sHtml += this.getModel("i18n").getResourceBundle().getText("WINDOW_RESULT");
        sHtml += "</span>";
        sHtml += "<span class='valueColumn'>";
        sHtml += mData.result;
        sHtml += "</span>";
        sHtml += "</div>";

        return sHtml;
    };

    return MapControl;
});
