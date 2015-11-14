sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/Element"
], function (jQuery, Element) {
    "use strict";

    /**
     * Constructor for a new Driver.
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * The Driver element holds information about a driver on a Map.
     * @extends sap.ui.core.Element
     *
     * @constructor
     * @alias bmvi.ui.app.lib.Driver
     */
    var Driver = Element.extend("bmvi.ui.app.lib.Driver", {
        metadata: {
            library: "bmvi.ui.app.lib",
            properties: {
                /**
                 * Position of the Driver as point.
                 */
                point: {
                    type: "bmvi.ui.app.lib.Position",
                    group: "Data"
                },
                /**
                 * Name of the driver.
                 */
                name: {
                    type: "string",
                    group: "Data"
                }
            }
        }
    });

    return Driver;
});
