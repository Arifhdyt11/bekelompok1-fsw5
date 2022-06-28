require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    ssl: true,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    dialect: "postgres",
    ssl: true,
  },
  production: {
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
