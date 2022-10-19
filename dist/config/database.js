"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_connection_string_1 = require("pg-connection-string");
exports.default = ({ env }) => {
    const config = (0, pg_connection_string_1.parse)(env("DATABASE_URL"));
    return {
        connection: {
            client: "postgres",
            connection: {
                host: env("DATABASE_HOST", config.host),
                port: env.int("DATABASE_PORT", config.port),
                database: env("DATABASE_NAME", config.database),
                user: env("DATABASE_USER", config.user),
                password: env("DATABASE_PASSWORD", config.password),
                timezone: env("DATABASE_TIMEZONE"),
                ssl: env.json("DATABASE_SSL", { rejectUnauthorized: false }),
            },
            options: {
                ssl: false,
            },
        },
    };
};
