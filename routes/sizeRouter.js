const express = require("express");
const router = express.Router();
const sizeController = require("../app/controllers/api/v1/sizeController");
const sizeMiddleware = require("../middlewares/sizeMiddleware");

router.get("/", sizeController.list);
router.get("/:id", sizeMiddleware.getById, sizeController.show);
router.post("/", sizeController.create);
router.put("/:id", sizeMiddleware.getById, sizeController.update);
router.delete("/:id", sizeMiddleware.getById, sizeController.destroy);

module.exports = router;
