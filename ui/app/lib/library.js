/**
 * OpenUI5 library for bmvi controls.
 *
 * @namespace
 * @name bmvi.ui.app.lib
 */
sap.ui.define([
    "jquery.sap.global",
    "sap/m/library",
    "sap/ui/base/DataType",
    "sap/ui/core/library"
], function (jQuery, library, DataType) {
    "use strict";

    sap.ui.getCore().initLibrary({
        name: "bmvi.ui.app.lib",
        version: "1.0.0",
        dependencies: [
            "sap.m",
            "sap.ui.core"
        ],
        types: [
            "bmvi.ui.app.lib.Position"
        ],
        interfaces: [],
        controls: [
            "bmvi.ui.app.lib.Map"
        ],
        elements: [
            "bmvi.ui.app.lib.Marker"
        ]
    });

    /**
     * @class A string type that represents a GPS Position.
     * @static
     */
    bmvi.ui.app.lib.Position = DataType.createType("bmvi.ui.app.lib.Position", {
        isValid: function (vValue) {
            return /^\d+\.\d+, ?\d+\.\d+$/.test(vValue);
        }
    }, DataType.getType("string"));

    return bmvi.ui.app.lib;
});
