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
