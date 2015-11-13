sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    var HomeController = BaseController.extend("bmvi.ui.app.controller.Home");

    HomeController.prototype.onTilePressed = function (oEvent) {
        // TODO: Handle other Tiles
        if (oEvent.getSource().getTitle() === this.getView().getModel("i18n").getResourceBundle().getText("PLACES")) {
            this.getRouter().navTo("places");
        }
    };

    return HomeController;
});
