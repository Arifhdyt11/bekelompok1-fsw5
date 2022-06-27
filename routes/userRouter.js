const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/api/v1/auth/userController");
const userMiddleware = require("../middlewares/userMiddleware");

router.post("/login", userController.login);
router.post(
  "/register",
  userMiddleware.validateEmailRegister,
  userController.register
);
router.get("/profile/:id", userMiddleware.authorize, userController.profile);
router.put(
  "/profile/:id",
  userMiddleware.authorize,
  userController.updateProfile
);

module.exports = router;
