sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    var PlacesController = BaseController.extend("bmvi.ui.app.controller.Places");

    PlacesController.prototype.onInit = function () {
        this.getRouter().getTargets().getTarget("places").attachDisplay(this._onTargetDisplay, this);
    };

    PlacesController.prototype._onTargetDisplay = function (oEvent) {
        var sPlace = oEvent.getParameter("data").place;
        var oModel = this.getView().getModel();
        if (sPlace) {
            oModel.setProperty("/selectedPlace", sPlace);
        } else {
            this.getRouter().navTo("places", {
                place: Object.keys(oModel.getProperty("/places"))[0]
            }, true);
        }
    };

    PlacesController.prototype.onNavBack = function () {
        this.getRouter().navTo("home");
    };

    PlacesController.prototype.onItemSelected = function (oEvent) {
        this.getRouter().navTo("places", {
            place: oEvent.getParameter("listItem").getTitle()
        });
    };

    return PlacesController;
});
