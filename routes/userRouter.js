const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/api/v1/auth/userController");
const userMiddleware = require("../middlewares/userMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/whoami", userMiddleware.authorize, userController.whoami);

module.exports = router;
