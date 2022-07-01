const express = require("express");
const router = express.Router();
const wishlistController = require("../app/controllers/api/v1/wishlistController");
const wishlistMiddleware = require("../middlewares/wishlistMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", wishlistController.list);
router.get(
  "/buyer", 
  userMiddleware.authorize, 
  userMiddleware.isBuyyer, 
  wishlistMiddleware.getByRole, 
  wishlistController.listByBuyer
);
router.get(
  "/seller", 
  userMiddleware.authorize, 
  userMiddleware.isSeller, 
  wishlistMiddleware.getByRole, 
  wishlistController.listBySeller
);
router.get(
  "/buyer/:id", 
  userMiddleware.authorize, 
  userMiddleware.isBuyyer, 
  wishlistController.showByBuyer
);
router.get(
  "/seller/:id", 
  userMiddleware.authorize, 
  userMiddleware.isSeller, 
  wishlistController.showBySeller
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
  // wishlistMiddleware.getById,
  wishlistController.destroy
);

module.exports = router;
