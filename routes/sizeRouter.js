const express = require("express");
const router = express.Router();
const sizeController = require("../app/controllers/api/v1/sizeController");
const sizeMiddleware = require("../middlewares/sizeMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
const validator = require("../helpers/validator");

router.get("/", sizeController.list);
// router.get(
//   "/",
//   userMiddleware.authorize,
//   userMiddleware.isSeller,
//   sizeController.list
// );
router.post(
  "/",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  validator.valuesValidate,
  sizeController.create
);
router.put(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  validator.valuesValidate,
  sizeMiddleware.getById,
  sizeController.update
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  sizeMiddleware.getById,
  sizeController.destroy
);

module.exports = router;
