const wishlistService = require("../app/services/wishlistService");

module.exports = {
  async getById(req, res, next) {
    try {
      const data = await wishlistService.get(req.params.id);
      if (data !== null) {
        next();
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async getProductByUser(req, res, next) {
    try {
      const productId = await wishlistService.getProductByUser(
        req.user.id,
        req.body.productId
      );

      if (productId) {
        res.status(422).json({
          status: false,
          message: "Product already in wishlist",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
};
