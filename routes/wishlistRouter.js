const express = require("express");
const router = express.Router();
const wishlistController = require("../app/controllers/api/v1/wishlistController");
const userMiddleware = require("../middlewares/userMiddleware");

router.get(
  "/", 
  userMiddleware.authorize, 
  wishlistController.list
);
router.get(
  "/buyer/:id",
  userMiddleware.authorize, 
  userMiddleware.isBuyyer, 
  wishlistController.showAllByBuyer
);
router.get(
  "/seller/:id", 
  userMiddleware.authorize, 
  userMiddleware.isSeller, 
  wishlistController.showAllBySeller
);
router.post(
  "/",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  wishlistController.create
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  wishlistController.destroy
);

module.exports = router;
