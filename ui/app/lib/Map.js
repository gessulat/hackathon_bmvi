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

        this._oMap = new google.maps.Map(this.getDomRef(), {
            center: Map.decodePosition(this.getCenter()),
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            styles: [
                {
                    featureType: "poi",
                    stylers: [
                        {
                            visibility: "off"
                        }
                    ]
                }
            ],
            zoom: this.getZoom()
        });

        this.getMarkers().forEach(function (oMarker) {
            oMarker.googleMarker = new google.maps.Marker({
                position: Map.decodePosition(oMarker.getPoint()),
                map: this._oMap,
                title: oMarker.getTitle()
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
                    map: this._oMap,
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
                map: this._oMap,
                content: oDriver.getName()
            });
        }, this);
    };

    return MapControl;
});
