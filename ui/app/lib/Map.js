sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Control"
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
            aStyles.push({
                featureType: "landscape",
                stylers: [
                    {
                        color: "#eeeeee"
                    }
                ]
            });
        }

        var oMap = new google.maps.Map(this.getDomRef(), {
            center: Map.decodePosition(this.getCenter()),
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            styles: aStyles,
            zoom: this.getZoom()
        });

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
                strokeColor: "#007cc0",
                strokeOpacity: 0.8,
                map: oMap
            });
            google.maps.event.addListener(oPolyline, "click", function (oEvent) {
                new google.maps.InfoWindow({
                    content: mLine.name,
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
        }, this);

        this.getDrivers().forEach(function (oDriver) {
            oDriver.infoWindow = new google.maps.InfoWindow({
                position: Map.decodePosition(oDriver.getPoint()),
                map: oMap,
                content: oDriver.getName()
            });
        }, this);
    };

    return MapControl;
});
