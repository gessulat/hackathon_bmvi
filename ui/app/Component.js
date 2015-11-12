sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";

    var Component = UIComponent.extend("bmvi.ui.app.Component", {
        metadata: {
            manifest: "json"
        }
    });

    Component.prototype.init = function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
    };

    return Component;
});
