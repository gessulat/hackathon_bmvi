sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    var BaseController = Controller.extend("bmvi.ui.app.controller.BaseController");

    BaseController.prototype.getRouter = function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
    };

    BaseController.prototype.onNavBack = function () {
        if (typeof History.getInstance().getPreviousHash() !== "undefined") {
            window.history.go(-1);
        } else {
            this.getRouter().navTo("appHome", {}, true);
        }
    };

    return BaseController;
});
