const express = require("express");
const router = express.Router();
const wishlistController = require("../app/controllers/api/v1/wishlistController");
const wishlistMiddleware = require("../middlewares/wishlistMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, wishlistMiddleware.getByRole);
// router.get("/:id", userMiddleware.authorize, wishlistController.show);
router.post(
  "/",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  wishlistMiddleware.getProductByUser,
  wishlistController.create
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  // wishlistMiddleware.getById,
  wishlistController.destroy
);

module.exports = router;
