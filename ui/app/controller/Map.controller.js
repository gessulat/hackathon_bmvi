sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    var MapController = BaseController.extend("bmvi.ui.app.controller.Map");

    MapController.prototype.onInit = function () {
        this.getRouter().getTargets().getTarget("places").attachDisplay(this._onTargetDisplay, this);
    };

    MapController.prototype._onTargetDisplay = function (oEvent) {
        var sPlace = oEvent.getParameter("data").place;
        if (sPlace) {
            this.getView().bindElement("/places/" + sPlace);
        }
    };

    return MapController;
});
