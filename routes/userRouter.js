const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/api/v1/auth/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const uploadOnMemory = require("../config/uploadOnMemory");
const validator = require("../helpers/validator");
const oauth = require("../app/controllers/api/v1/auth/handleGoogleLoginOrRegister");

// oauth
router.post("/google", oauth.handleGoogleLoginOrRegister);

router.post("/login", validator.requestLogin, userController.login);
router.post("/register", validator.requestRegister, userController.register);
router.get("/profile", userMiddleware.authorize, userController.profile);
router.put(
  "/profile",
  userMiddleware.authorize,
  uploadOnMemory.single("image"),
  userController.updateProfile
);

router.put(
  "/change-password",
  userMiddleware.authorize,
  validator.requestChangePassword,
  userController.changePassword
);

// end point for testing
router.delete("/user", userController.delete);

module.exports = router;
