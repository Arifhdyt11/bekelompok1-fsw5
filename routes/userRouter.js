const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/api/v1/auth/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const uploadOnMemory = require("../config/uploadOnMemory");

// oauth
const handleGoogleLoginOrRegister = require("../app/controllers/api/v1/auth/handleGoogleLoginOrRegister");
router.post("/google", handleGoogleLoginOrRegister);

router.post("/login", userController.login);
router.post(
  "/register",
  userMiddleware.validateEmailRegister,
  userController.register
);
router.get("/profile", userMiddleware.authorize, userController.profile);
router.put(
  "/profile",
  userMiddleware.authorize,
  userMiddleware.validateUpdate,
  uploadOnMemory.single("image"),
  userController.updateProfile
);

router.put(
  "/change-password",
  userMiddleware.authorize,
  userController.changePassword
);

// end point for testing
router.delete("/user", userController.delete);

module.exports = router;
