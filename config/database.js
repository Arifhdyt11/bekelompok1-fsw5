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
    username: "stvpyupniaoiec",
    password: "c67ea4246fb6bf1201d6d891ab30276539df8d1debc32333b52f6666c0273bf5",
    database: "d7c2vo11n4der1",
    host: "ec2-34-200-35-222.compute-1.amazonaws.com",
    dialect: "postgres",
    ssl: true,
  },
};
