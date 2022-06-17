const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/api/v1/auth/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/whoami", userController.whoami);

module.exports = router;
