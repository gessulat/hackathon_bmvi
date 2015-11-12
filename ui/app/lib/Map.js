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
     * @public
     * @alias bmvi.ui.app.lib.Map
     */
    var MapControl = Control.extend("bmvi.ui.app.lib.Map", {
        metadata: {
            library: "bmvi.ui.app.lib",
            properties: {
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
                }
            },
            defaultAggregation: "markers",
            aggregations: {
                /**
                 * List of Markers on this Map.
                 */
                markers: {
                    type: "bmvi.ui.app.lib.Marker",
                    multiple: true,
                    singleName: "marker"
                }
            }
        }
    });

    MapControl.prototype.init = function () {
        this._aMarkers = [];
    };

    MapControl.prototype.onAfterRendering = function () {
        this._oMap = new google.maps.Map(this.getDomRef(), {
            center: new google.maps.LatLng(52.529208, 13.378254),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this._aMarkers = this.getMarkers().map(function (oMarker) {
            return new google.maps.Marker({
                position: {
                    lat: oMarker.getLat(),
                    lng: oMarker.getLng()
                },
                map: this._oMap,
                title: oMarker.getTitle()
            });
        }, this);
    };

    return MapControl;
});
