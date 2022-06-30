const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/api/v1/productController");
const productMiddleware = require("../middlewares/productMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", productController.list);
router.get("/seller", productController.listSeller);
router.get("/:id", productController.show);
router.post(
  "/", 
  userMiddleware.authorize, 
  userMiddleware.isSeller,
  productMiddleware.nameValidate, 
  productController.create
);

router.put(
  "/:id",
  userMiddleware.authorize, 
  userMiddleware.isSeller,
  productMiddleware.getById,
  productMiddleware.nameValidate,
  productController.update
);

router.delete(
  "/:id",
  userMiddleware.authorize, 
  userMiddleware.isSeller,
  productMiddleware.getById, 
  productController.destroy
);

module.exports = router;
