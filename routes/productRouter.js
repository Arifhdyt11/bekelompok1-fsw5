const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/api/v1/productController");
const uploadOnMemory = require("../config/uploadOnMemory");
const productMiddleware = require("../middlewares/productMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
const validator = require("../helpers/validator");

router.get("/", productController.list);
router.get(
  "/seller",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  productController.listBySeller
);
router.get("/:id", productController.show);
router.get(
  "/seller/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  productController.showBySeller
);
router.post(
  "/",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  validator.userIdentity,
  uploadOnMemory.array("image", 4),
  validator.requestProduct,
  productController.create
);

router.put(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  uploadOnMemory.array("image", 4),
  productMiddleware.getBySellerId,
  validator.requestProduct,
  productController.update
);

router.delete(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  productMiddleware.getBySellerId,
  productController.destroy
);

module.exports = router;
