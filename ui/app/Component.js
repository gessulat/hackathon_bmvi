sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";

    /**
     * Constructor for a new Component.
     *
     * @class
     * Component for the application.
     * @extends sap.ui.core.UIComponent
     *
     * @constructor
     * @alias bmvi.ui.app.Component
     */
    var Component = UIComponent.extend("bmvi.ui.app.Component", {
        metadata: {
            manifest: "json"
        }
    });

    /**
     * Initialise the Component.
     * Start the routing.
     * @override
     */
    Component.prototype.init = function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
    };

    return Component;
});
