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

    /**
     * Initializes the Map Control.
     * @override
     */
    MapControl.prototype.init = function () {
        this._mMarkers = {};
    };

    /**
     * Function is called when the rendering of the control is completed.
     * Creates the Google Map and places it in the DOM.
     * @override
     */
    MapControl.prototype.onAfterRendering = function () {
        this._oMap = new google.maps.Map(this.getDomRef(), {
            center: new google.maps.LatLng(52.529208, 13.378254),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    };

    /**
     * Add an Element to the aggregation `markers`.
     * Adds the Marker to the map.
     * @override
     * @param {bmvi.ui.app.lib.Marker} oMarker Marker Element to be displayed on the map
     */
    MapControl.prototype.addMarker = function (oMarker) {
        this._mMarkers[oMarker.getId()] = new google.maps.Marker({
            position: {
                lat: oMarker.getLat(),
                lng: oMarker.getLng()
            },
            map: this._oMap,
            title: oMarker.getTitle()
        });
        this.addAggregation("markers", oMarker, true);
    };

    /**
     * Remove an Element from the aggregation `markers`.
     * Also removes the Marker from the map.
     * @param {bmvi.ui.app.lilb.Marker} oMarker Marker Element to be removed
     */
    MapControl.prototype.removeMarker = function (oMarker) {
        this._mMarkers[oMarker.getId()].setMap(null);
        delete this._mMarkers[oMarker.getId()];
        this.removeAggregation("markers", oMarker, true);
    };

    return MapControl;
});
