const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/api/v1/productController");
const uploadOnMemory = require("../config/uploadOnMemory");
const productMiddleware = require("../middlewares/productMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

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
  uploadOnMemory.array("image", 4),
  userMiddleware.authorize,
  userMiddleware.isSeller,
  productMiddleware.postValidate,
  productController.create
);

router.put(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  productMiddleware.getById,
  productMiddleware.getBySellerId,
  productMiddleware.postValidate,
  productController.update
);

router.delete(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  productMiddleware.getById,
  productMiddleware.getBySellerId,
  productController.destroy
);

module.exports = router;
