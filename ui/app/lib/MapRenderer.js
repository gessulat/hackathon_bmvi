sap.ui.define(function () {
    "use strict";

    /**
     * Map renderer.
     * @namespace
     */
    var MapRenderer = {};

    /**
     * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
     * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the
     *                                                   Render-Output-Buffer
     * @param {sap.ui.core.Control}       oControl       an object representation of the control that should be rendered
     */
    MapRenderer.render = function (oRenderManager, oControl) {
        oRenderManager.write("<div");
        oRenderManager.writeControlData(oControl);
        oRenderManager.addClass("bmviLibMap");
        oRenderManager.addStyle("height", oControl.getHeight());
        oRenderManager.addStyle("width", oControl.getWidth());
        oRenderManager.writeStyles();
        oRenderManager.writeClasses();
        oRenderManager.write(">");
        oRenderManager.write("</div>");
    };

    return MapRenderer;
}, true);
