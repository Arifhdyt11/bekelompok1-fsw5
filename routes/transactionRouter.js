const express = require("express");
const router = express.Router();
const transactionController = require("../app/controllers/api/v1/transactionController");
const transactionMiddleware = require("../middlewares/transactionMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get(
  "/", 
  userMiddleware.authorize, 
  transactionController.list
);
router.get(
  "/buyer/:id",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  transactionController.listByBuyer,
);
router.get(
  "/seller/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  transactionController.listBySeller,
);
router.post(
  "/",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  transactionMiddleware.getProductByUser,
  transactionController.create
);

module.exports = router;
