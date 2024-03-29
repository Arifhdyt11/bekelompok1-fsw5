const express = require("express");
const router = express.Router();
const main = require("../app/controllers/api/v1/main");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

// define routes file here
const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const wishlistRouter = require("./wishlistRouter");
const transactionRouter = require("./transactionRouter");
const sizeRouter = require("./sizeRouter");
const notifRouter = require("./notifRouter");

/* ========= Main Routes ========= */
// definisikan router yang akan anda buat disini
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1", userRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/wishlist", wishlistRouter);
router.use("/api/v1/transaction", transactionRouter);
router.use("/api/v1/size", sizeRouter);
router.use("/api/v1/notif", notifRouter);

/* ========= Open API Routes ========= */
// show open api format .json
router.get("/api/v1/docs-json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// show open api with Swagger UI
router.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use(main.onLost);
router.use(main.onError);

module.exports = router;
