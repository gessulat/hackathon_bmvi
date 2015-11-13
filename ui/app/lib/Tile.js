sap.ui.define([
    "jquery.sap.global",
    "sap/m/StandardTile"
], function (jQuery, StandardTile) {
    "use strict";

    /**
     * Constructor for a new Tile.
     *
     * @param {string} [sId]       id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class
     * The Tile control extends the StandardTile with a key property.
     * @extends sap.m.StandardTile
     *
     * @constructor
     * @alias bmvi.ui.app.lib.Tile
     */
    var Tile = StandardTile.extend("bmvi.ui.app.lib.Tile", {
        metadata: {
            library: "bmvi.ui.app.lib",
            properties: {
                /**
                 * Key for the Tile to save navigation information.
                 */
                key: {
                    type: "string",
                    group: "Data"
                }
            }
        },
        renderer: "sap.m.StandardTileRenderer"
    });

    return Tile;
});
