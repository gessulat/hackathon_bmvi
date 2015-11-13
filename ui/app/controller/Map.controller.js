sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    /**
     * Constructor for a new Map Controller.
     *
     * @class
     * Controller for the Map View.
     * @extends bmvi.ui.app.controller.BaseController
     *
     * @constructor
     * @alias bmvi.ui.app.controller.Map
     */
    var MapController = BaseController.extend("bmvi.ui.app.controller.Map");

    /**
     * Initialise the Controller.
     * Attach target display handler.
     * @override
     */
    MapController.prototype.onInit = function () {
        this.getRouter().getTargets().getTarget("routes").attachDisplay(this._onTargetDisplay, this);
    };

    /**
     * Handle `routes`-Target displayed.
     * Bind the view to the selected "route".
     * @private
     * @param {sap.ui.base.Event} oEvent Target display Event
     */
    MapController.prototype._onTargetDisplay = function (oEvent) {
        var sRoute = oEvent.getParameter("data").route;
        if (sRoute) {
            this.getView().bindElement("/routes/" + sRoute);
        }
    };

    return MapController;
});
