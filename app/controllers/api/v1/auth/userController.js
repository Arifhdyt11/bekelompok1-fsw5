require("dotenv").config();
const userService = require("../../../../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const roleUpper = role.toUpperCase();
      const hashedPassword = await bcrypt.hash(password, 10);
      let data = await userService.create({
        role: roleUpper,
        name: name,
        email: email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      let user = data;
      delete user.password;

      res.status(201).json({
        status: true,
        message: "User has been created!",
        data: data,
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
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: false,
          message: "Password is incorrect!",
        });
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
      const data = await userService.getCurrentUser(userTokenId);
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
      const data = await userService.updateCurrentUser(userTokenId, req.body);
      res.status(200).json({
        status: true,
        message: "Successfully update data user",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
