const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const router = require("../routes");

const app = express();

/** Install request logger */
app.use(logger("dev"));
app.use(cookieParser());

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
