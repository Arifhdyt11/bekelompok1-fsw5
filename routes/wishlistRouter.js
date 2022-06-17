const express = require("express");
const router = express.Router();
const wishlistController = require("../app/controllers/api/v1/wishlistController");
const wishlistMiddleware = require("../middlewares/wishlistMiddleware");

router.get("/", wishlistController.list);
router.get("/:id", wishlistController.show);
router.post("/", wishlistMiddleware.nameValidate, wishlistController.create);
router.put(
  "/:id",
  wishlistMiddleware.getById,
  wishlistMiddleware.nameValidate,
  wishlistController.update
);
router.delete("/:id", wishlistMiddleware.getById, wishlistController.destroy);

module.exports = router;
