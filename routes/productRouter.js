const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/api/v1/productController");
// const productMiddleware = require("../middlewares/getProductId");
const productMiddleware = require("../middlewares/productMiddleware");

router.get("/", productController.list);
router.get("/:id", productController.show);
router.post("/", productMiddleware.nameValidate, productController.create);
router.put(
  "/:id",
  productMiddleware.getById,
  productMiddleware.nameValidate,
  productController.update
);
router.delete("/:id", productMiddleware.getById, productController.destroy);

module.exports = router;
