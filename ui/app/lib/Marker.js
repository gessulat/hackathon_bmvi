sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Element"
], function (jQuery, Element) {
    "use strict";

    /**
     * Constructor for a new Marker.
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * The Marker element holds information about a marker on a Map.
     * @extends sap.ui.core.Element
     *
     * @constructor
     * @alias bmvi.ui.app.lib.Marker
     */
    var Marker = Element.extend("bmvi.ui.app.lib.Marker", {
        metadata: {
            library: "bmvi.ui.app.lib",
            properties: {
                /**
                 * Latitude in degrees.
                 * Values will be clamped to the range [-90, 90].
                 * This means that if the value specified is less than -90, it will be set to -90.
                 * And if the value is greater than 90, it will be set to 90.
                 */
                lat: {
                    type: "float",
                    group: "Data"
                },
                /**
                 * Longitude in degrees.
                 * Values outside the range [-180, 180] will be wrapped so that they fall within the range.
                 * For example, a value of -190 will be converted to 170. A value of 190 will be converted to -170.
                 * This reflects the fact that longitudes wrap around the globe.
                 */
                lng: {
                    type: "float",
                    group: "Data"
                },
                /**
                 * Position of the Marker as point.
                 */
                point: {
                    type: "bmvi.ui.app.lib.Position",
                    group: "Data"
                },
                /**
                 * Rollover text.
                 */
                title: {
                    type: "string",
                    group: "Data"
                }
            }
        }
    });

    return Marker;
});
