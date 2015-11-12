/**
 * OpenUI5 library for bmvi controls.
 *
 * @namespace
 * @name bmvi.ui.app.lib
 */
sap.ui.define([
    "jquery.sap.global",
    "sap/m/library",
    "sap/ui/core/library"
], function () {
    "use strict";

    sap.ui.getCore().initLibrary({
        name: "bmvi.ui.app.lib",
        version: "1.0.0",
        dependencies: [
            "sap.m",
            "sap.ui.core"
        ],
        types: [],
        interfaces: [],
        controls: [
            "bmvi.ui.app.lib.Map"
        ],
        elements: [
            "bmvi.ui.app.lib.Marker"
        ]
    });

    return bmvi.ui.app.lib;
});
