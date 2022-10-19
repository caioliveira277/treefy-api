"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    "strapi::errors",
    "strapi::security",
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "connect-src": ["'self'", "https:"],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        "treefy-api-upload.s3.sa-east-1.amazonaws.com",
                    ],
                    "media-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        "treefy-api-upload.s3.sa-east-1.amazonaws.com",
                    ],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
];
