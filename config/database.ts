export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT"),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USER"),
      password: env("DATABASE_PASSWORD"),
      timezone: env("DATABASE_TIMEZONE"),
      ssl: env("DATABASE_SSL", false),
    },
  },
});
