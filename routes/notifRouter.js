const express = require("express");
const router = express.Router();
const notifController = require("../app/controllers/api/v1/notifController");
const notifMiddleware = require("../middlewares/notifMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", notifController.list);
router.get(
  "/buyer", 
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  notifController.listByBuyer
);
router.get(
  "/seller", 
  userMiddleware.authorize,
  userMiddleware.isSeller,
  notifController.listBySeller
);
router.put(
  "/buyer/:id",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  notifMiddleware.getById,
  notifController.updateBuyer
);
router.put(
  "/seller/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  notifMiddleware.getById,
  notifController.updateSeller
);
router.delete(
  "/:id",
  userMiddleware.authorize, 
  notifController.destroy
);

module.exports = router;
