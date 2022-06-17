const express = require("express");
const router = express.Router();
const transactionController = require("../app/controllers/api/v1/transactionController");
// const productMiddleware = require("../middlewares/getProductId");
const transactionMiddleware = require("../middlewares/transactionMiddleware");

router.get("/", transactionController.list);
router.get("/:id", transactionController.show);
router.post(
  "/",
  transactionMiddleware.nameValidate,
  transactionController.create
);
router.put(
  "/:id",
  transactionMiddleware.getById,
  transactionMiddleware.nameValidate,
  transactionController.update
);
router.delete(
  "/:id",
  transactionMiddleware.getById,
  transactionController.destroy
);

module.exports = router;
