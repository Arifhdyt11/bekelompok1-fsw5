require("dotenv").config();
const jwt = require("jsonwebtoken");
const userService = require("../app/services/userService");

module.exports = {
  async validateEmailRegister(req, res, next) {
    try {
      const user = await userService.getByEmail(req.body.email);
      if (user !== null) {
        res.status(400).json({
          status: false,
          message: "Email is already registered!",
        });
        return;
      }
      next();
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async validateUpdate(req, res, next) {
    try {
      const { role, email, password } = req.body;
      if (role || email || password) {
        res.status(400).json({
          status: false,
          message: "You can't update role, email and password!",
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      );

      req.user = await userService.getById(tokenPayload.id);
      if (!req.user) {
        res.status(401).json({
          status: false,
          message: "Anda tidak punya akses (Unauthorized)",
        });
        return;
      }
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }

      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async isBuyyer(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      );

      req.user = await userService.getById(tokenPayload.id);
      if (!(req.user.role === "BUYER")) {
        res.status(401).json({
          status: false,
          message: "Anda tidak punya akses (Unauthorized)",
        });
        return;
      }
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }

      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async isSeller(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      );

      req.user = await userService.getById(tokenPayload.id);
      if (!(req.user.role === "SELLER")) {
        res.status(401).json({
          status: false,
          message: "Anda tidak punya akses (Unauthorized)",
        });
        return;
      }
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }

      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },
};
