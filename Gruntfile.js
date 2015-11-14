/* global module */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        curl: {
            "ui/vendor/tmp/openui5-runtime-1.32.5.zip": "https://openui5.hana.ondemand.com/downloads/openui5-runtime-1.32.5.zip",
        },
        unzip: {
            "ui/vendor/tmp/ui5": "ui/vendor/tmp/openui5-runtime-1.32.5.zip"
        },
        rename: {
            "ui/vendor/ui5": "ui/vendor/tmp/ui5/resources"
        },
        clean: {
            build: "ui/vendor/tmp",
            ui: {
                cwd: "ui/app",
                src: [
                    "**/*-dbg.js",
                    "**/*-dbg.controller.js",
                    "**/Component-preload.js",
                    "**/library-preload.json",
                    "**/library*.css",
                    "**/library-parameters.json",
                    "css/styles.css"
                ],
                expand: true
            }
        },
        "openui5_preload": {
            component: {
                options: {
                    resources: {
                        cwd: "ui/app",
                        prefix: "bmvi/ui/app",
                        src: [
                            "**/*.js",
                            "**/*.xml",
                            "!**/Component-preload.js"
                        ]
                    },
                    dest: "ui/app"
                },
                components: true
            },
            library: {
                options: {
                    resources: [
                        {
                            cwd: "ui/app",
                            prefix: "bmvi/ui/app"
                        }
                    ],
                    dest: "ui/app"
                },
                libraries: true
            },
        },
        copy: {
            ui: {
                cwd: "ui/app",
                src: [
                    "**/*.js",
                    "!**/*-dbg.js",
                    "!**/Component-preload.js"
                ],
                expand: true,
                dest: "ui/app/",
                rename: function (dest, src) {
                    return dest + src.replace(/(\.controller)?\.js$/, "-dbg$1.js");
                }
            }
        },
        "openui5_theme": {
            ui: {
                options: {
                    compiler: {
                        compress: true
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: "ui/app/lib/themes/",
                        src: [
                            "sap_bluecrystal/library.source.less",
                            "sap_hcb/library.source.less"
                        ],
                        dest: "ui/app/lib/themes/"
                    }
                ]
            }
        },
        less: {
            ui: {
                options: {
                    compress: true
                },
                files: {
                    "ui/app/css/style.css": "ui/app/css/style.less"
                }
            }
        },
        watch: {
            libStyle: {
                files: [
                    "ui/app/lib/themes/**/*.less"
                ],
                tasks: ["openui5_theme"],
                options: {
                    atBegin: true,
                    interrupt: true
                }
            },
            appStyle: {
                files: [
                    "ui/app/css/**.less"
                ],
                tasks: ["less"],
                options: {
                    atBegin: true,
                    interrupt: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 1337,
                    base: "ui"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-rename");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-curl");
    grunt.loadNpmTasks("grunt-openui5");
    grunt.loadNpmTasks("grunt-zip");

    grunt.registerTask("build", [
        "curl",
        "unzip",
        "rename",
        "clean:build"
    ]);
    grunt.registerTask("release", [
        "clean:ui",
        "openui5_preload",
        "copy",
        "openui5_theme",
        "less"
    ]);
    grunt.registerTask("dev", [
        "clean:ui",
        "openui5_theme",
        "less"
    ]);
    grunt.registerTask("serve", [
        "clean:ui",
        "connect",
        "watch"
    ]);
    grunt.registerTask("default", [
        "serve"
    ]);
};
