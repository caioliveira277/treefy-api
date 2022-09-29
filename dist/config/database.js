"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: "postgres",
        connection: {
            host: env("DATABASE_HOST"),
            port: env.int("DATABASE_PORT"),
            database: env("DATABASE_NAME"),
            user: env("DATABASE_USER"),
            password: env("DATABASE_PASSWORD"),
            timezone: env("DATABASE_TIMEZONE"),
            ssl: env.json("DATABASE_SSL", { rejectUnauthorized: false }),
        },
        options: {
            ssl: false,
        },
    },
});
