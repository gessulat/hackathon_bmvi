sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    /**
     * Constructor for a new BaseController.
     *
     * @class
     * Abstract base for Controllers in this application
     * @extends sap.ui.core.mvc.Controller
     *
     * @constructor
     * @alias bmvi.ui.app.controller.BaseController
     */
    var BaseController = Controller.extend("bmvi.ui.app.controller.BaseController");

    /**
     * Get the Router for this Controller.
     * @returns {sap.m.routing.Router} Router given by the owner component.
     */
    BaseController.prototype.getRouter = function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
    };

    /**
     * Navigate back one step.
     * If the history is empty, navigate to the home target.
     */
    BaseController.prototype.onNavBack = function () {
        if (typeof History.getInstance().getPreviousHash() !== "undefined") {
            window.history.go(-1);
        } else {
            this.getRouter().navTo("home", {}, true);
        }
    };

    return BaseController;
});
