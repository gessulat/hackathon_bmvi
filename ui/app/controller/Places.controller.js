sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    /**
     * Constructor for a new Places Controller.
     *
     * @class
     * Controller for the Places View.
     * @extends bmvi.ui.app.controller.BaseController
     *
     * @constructor
     * @alias bmvi.ui.app.controller.Places
     */
    var PlacesController = BaseController.extend("bmvi.ui.app.controller.Places");

    /**
     * Initialise the Controller.
     * Attach target display handler.
     * @override
     */
    PlacesController.prototype.onInit = function () {
        this.getRouter().getTargets().getTarget("places").attachDisplay(this._onTargetDisplay, this);
    };

    /**
     * Handle `places`-Target displayed.
     * If there is no selected "place", navigate to the first one in the Model.
     * @private
     * @param {sap.ui.base.Event} oEvent Target display Event
     */
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

    /**
     * Handler for NavBack Button press.
     * Navigate to the home target.
     */
    PlacesController.prototype.onNavBack = function () {
        this.getRouter().navTo("home");
    };

    /**
     * Handler for List selectionChange.
     * Navigate to the selected "place".
     * @param {sap.ui.base.Event} oEvent List selectionChange Event
     */
    PlacesController.prototype.onItemSelected = function (oEvent) {
        this.getRouter().navTo("places", {
            place: oEvent.getParameter("listItem").getTitle()
        });
    };

    return PlacesController;
});
