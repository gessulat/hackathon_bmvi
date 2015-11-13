sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    /**
     * Constructor for a new Home Controller.
     *
     * @class
     * Controller for the Home View.
     * @extends bmvi.ui.app.controller.BaseController
     *
     * @constructor
     * @alias bmvi.ui.app.controller.Home
     */
    var HomeController = BaseController.extend("bmvi.ui.app.controller.Home");

    /**
     * Handler for Tile press Event.
     * @param {sap.ui.base.Event} oEvent Tile press Event
     */
    HomeController.prototype.onTilePressed = function (oEvent) {
        // TODO: Handle other Tiles
        if (oEvent.getSource().getTitle() === this.getView().getModel("i18n").getResourceBundle().getText("PLACES")) {
            this.getRouter().navTo("places");
        }
    };

    return HomeController;
});
