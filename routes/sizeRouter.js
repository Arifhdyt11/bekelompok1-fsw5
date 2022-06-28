const express = require("express");
const router = express.Router();
const sizeController = require("../app/controllers/api/v1/sizeController");
const sizeMiddleware = require("../middlewares/sizeMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", sizeController.list);
router.post(
  "/", 
  userMiddleware.authorize,
  userMiddleware.isSeller,
  sizeMiddleware.valuesValidate,
  sizeController.create);
router.put(
  "/:id", 
  userMiddleware.authorize, 
  userMiddleware.isSeller, 
  sizeMiddleware.valuesValidate, 
  sizeMiddleware.getById, 
  sizeController.update);
router.delete(
  "/:id", 
  userMiddleware.authorize, 
  userMiddleware.isSeller, 
  sizeMiddleware.getById, 
  sizeController.destroy);

module.exports = router;
