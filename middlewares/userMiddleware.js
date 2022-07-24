require("dotenv").config();
const userService = require("../app/services/userService");

module.exports = {
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const tokenPayload = await userService.verifyToken(bearerToken);

      req.user = await userService.getById(tokenPayload.id);

      console.log(req.body);

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
        res.status(401).json({
          status: false,
          message: "Token Expired",
        });
        return;
      }
      console.log(error);
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
  },

  async isBuyyer(req, res, next) {
    try {
      const userTokenRole = req.user.role;
      if (!(userTokenRole === "BUYER")) {
        res.status(401).json({
          status: false,
          message: "Anda tidak punya akses (Unauthorized)",
        });
        return;
      }
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({
          status: false,
          message: "Token Expired",
        });
        return;
      }
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
  },

  async isSeller(req, res, next) {
    try {
      const userTokenRole = req.user.role;
      if (!(userTokenRole === "SELLER")) {
        res.status(401).json({
          status: false,
          message: "Anda tidak punya akses (Unauthorized)",
        });
        return;
      }
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({
          status: false,
          message: "Token Expired",
        });
        return;
      }
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
  },
};
