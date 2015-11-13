sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (BaseController, MessageToast, JSONModel) {
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

    MapController.prototype.onNotifyPress = function () {
        if (!this._oDialog) {
            this._oDialog = sap.ui.xmlfragment("bmvi.ui.app.view.Notify", this);
            this.getView().addDependent(this._oDialog);
        }
        this._oDialog.setModel(new JSONModel({
            driver: "Engin",
            route: this.getView().getBindingContext().getProperty("title"),
            comment: ""
        }), "dialog");
        this._oDialog.open();
    };

    MapController.prototype.onNotificationSend = function () {
        // TODO: Send request?
        //        jQuery.ajax({
        //            url: "",
        //            type: "POST",
        //            data: this._oDialog.getModel("dialog").getProperty("comment")
        //        }).done(function () {});
        MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("NOTIFICATION_SENT"));
        this._oDialog.close();
    };

    MapController.prototype.onDialogClose = function () {
        this._oDialog.close();
    };

    return MapController;
});
