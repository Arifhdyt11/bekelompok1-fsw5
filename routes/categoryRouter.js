const express = require("express");
const router = express.Router();
const categoryController = require("../app/controllers/api/v1/categoryController");
const categoryMiddleware = require("../middlewares/categoryMiddleware");
const validator = require("../helpers/validator");

router.get("/", categoryController.list);
router.get("/:id", categoryController.show);
// router.post("/", validator.nameValidate, categoryController.create);
// router.put(
//   "/:id",
//   categoryMiddleware.getById,
//   validator.nameValidate,
//   categoryController.update
// );
// router.delete("/:id", categoryMiddleware.getById, categoryController.destroy);

module.exports = router;
