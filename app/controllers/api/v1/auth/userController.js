require("dotenv").config();
const userService = require("../../../../services/userService");

module.exports = {
  async register(req, res) {
    try {
      const requestBody = req.body;
      const registeredUser = await userService.handleRegister(requestBody);

      res.status(201).json({
        status: true,
        message: "User has been created!",
        data: registeredUser,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async login(req, res) {
    try {
      const requestBody = req.body;
      const token = await userService.handleLogin(requestBody);

      res.status(200).json({
        status: true,
        message: "Login successfully!",
        accessToken: token,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    }
  },

  async profile(req, res) {
    try {
      const userTokenId = req.user.id;
      const data = await userService.getById(userTokenId);

      res.status(200).json({
        status: true,
        message: "Successfully find data user",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateProfile(req, res) {
    try {
      const userTokenId = req.user.id;
      const requestBody = req.body;
      const requestFile = req.file;

      const userUpdated = await userService.handleUpdateProfile(
        userTokenId,
        requestBody,
        requestFile
      );

      res.status(200).json({
        status: true,
        message: "User Updated",
        data: userUpdated,
      });
    } catch (err) {
      res.status(422).send({
        status: false,
        message: err.message,
      });
    }
  },

  async changePassword(req, res) {
    try {
      const userTokenEmail = req.user.email;
      const userTokenId = req.user.id;
      const requestBody = req.body;

      await userService.handleChangePassword(
        userTokenEmail,
        userTokenId,
        requestBody
      );

      res.status(200).json({
        status: true,
        message: "Successfully change password!",
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      await userService.delete(req.body.email);
      res.status(200).json({
        status: true,
        message: "User has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
