sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Element"
], function (jQuery, Element) {
    "use strict";

    /**
     * Constructor for a new Route.
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * The Route element holds information about a Route on a Map.
     * @extends sap.ui.core.Element
     *
     * @constructor
     * @alias bmvi.ui.app.lib.Route
     */
    var Route = Element.extend("bmvi.ui.app.lib.Route", {
        metadata: {
            library: "bmvi.ui.app.lib",
            properties: {
                /**
                 * End of the Route.
                 */
                end: {
                    type: "bmvi.ui.app.lib.Position",
                    group: "Data"
                },
                /**
                 * Start of the Route.
                 */
                start: {
                    type: "bmvi.ui.app.lib.Position",
                    group: "Data"
                },
                /**
                 * Alternative routes from start to end.
                 */
                routes: {
                    type: "object[]",
                    group: "Data"
                }
            }
        }
    });

    return Route;
});
