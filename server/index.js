const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("../routes");
const bodyParser = require("body-parser");

const app = express();

/** Install request logger */
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

/** Install Router */
app.use(router);

module.exports = app;
