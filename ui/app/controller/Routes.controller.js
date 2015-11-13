sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    /**
     * Constructor for a new Routes Controller.
     *
     * @class
     * Controller for the Routes View.
     * @extends bmvi.ui.app.controller.BaseController
     *
     * @constructor
     * @alias bmvi.ui.app.controller.Routes
     */
    var RoutesController = BaseController.extend("bmvi.ui.app.controller.Routes");

    /**
     * Initialise the Controller.
     * Attach target display handler.
     * @override
     */
    RoutesController.prototype.onInit = function () {
        this.getRouter().getTargets().getTarget("routes").attachDisplay(this._onTargetDisplay, this);
    };

    /**
     * Handle `routes`-Target displayed.
     * If there is no selected "route", navigate to the first one in the Model.
     * @private
     * @param {sap.ui.base.Event} oEvent Target display Event
     */
    RoutesController.prototype._onTargetDisplay = function (oEvent) {
        var sRoute = oEvent.getParameter("data").route;
        var oModel = this.getView().getModel();
        if (sRoute) {
            oModel.setProperty("/selectedRoute", sRoute);
        } else {
            this.getRouter().navTo("routes", {
                route: Object.keys(oModel.getProperty("/routes"))[0]
            }, true);
        }
    };

    /**
     * Handler for NavBack Button press.
     * Navigate to the home target.
     */
    RoutesController.prototype.onNavBack = function () {
        this.getRouter().navTo("home");
    };

    /**
     * Handler for List selectionChange.
     * Navigate to the selected "route".
     * @param {sap.ui.base.Event} oEvent List selectionChange Event
     */
    RoutesController.prototype.onItemSelected = function (oEvent) {
        this.getRouter().navTo("routes", {
            route: oEvent.getParameter("listItem").getBindingContext().getProperty("key")
        });
    };

    return RoutesController;
});
