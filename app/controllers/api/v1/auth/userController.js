require("dotenv").config();
const userService = require("../../../../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  async register(req, res) {
    try {
      const newUser = await userService.create(req.body);

      const postedData = await userService.getById(newUser.id);

      res.status(201).json({
        status: true,
        message: "User has been created!",
        data: postedData,
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
      const user = await userService.getByEmail(req.body.email);
      if (user === null) {
        res.status(400).json({
          status: false,
          message: "Email is not registered!",
        });
        return;
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: false,
          message: "Password is incorrect!",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_TIME,
        }
      );
      res.status(200).json({
        status: true,
        message: "Login successfully!",
        data: token,
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
      await userService.updateCurrentUser(userTokenId, req.body);
      const updatedData = await userService.getById(userTokenId);

      res.status(200).json({
        status: true,
        message: "Successfully update data user",
        data: updatedData,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async changePassword(req, res) {
    try {
      const userTokenEmail = req.user.email;
      const userTokenId = req.user.id;
      const user = await userService.getByEmail(userTokenEmail);

      const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: false,
          message: "Password is incorrect!",
        });
        return;
      }
      await userService.updateCurrentUser(userTokenId, req.body);

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
};
