const productService = require("../app/services/productService");

module.exports = {
  async getBySellerId(req, res, next) {
    try {
      const sellerId = req.user.id;
      dataProductById = await productService.getBySellerId(
        req.params.id,
        sellerId
      );
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
};
