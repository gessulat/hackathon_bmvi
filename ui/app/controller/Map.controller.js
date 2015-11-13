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
        this.getRouter().getTargets().getTarget("places").attachDisplay(this._onTargetDisplay, this);
    };

    /**
     * Handle `places`-Target displayed.
     * Bind the view to the selected "place".
     * @private
     * @param {sap.ui.base.Event} oEvent Target display Event
     */
    MapController.prototype._onTargetDisplay = function (oEvent) {
        var sPlace = oEvent.getParameter("data").place;
        if (sPlace) {
            this.getView().bindElement("/places/" + sPlace);
        }
    };

    return MapController;
});
