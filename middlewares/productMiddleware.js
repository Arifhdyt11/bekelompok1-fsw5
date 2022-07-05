const productService = require("../app/services/productService");

module.exports = {
  async postValidate(req, res, next) {
    try {
      const { name, price, categoryId } = req.body;
      if (!name || !price || !categoryId) {
        res.status(400).json({
          status: false,
          message: "Name are required!",
        });
      }
      next();
      // next();
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async getById(req, res, next) {
    try {
      const data = await productService.get(req.params.id);
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
        message: error.message,
      });
    }
  },

  async getBySellerId(req, res, next) {
    try {
      const sellerId = req.user.id;
      const data = await productService.getBySellerId(req.params.id, sellerId);
      id = req.params.id;
      if (data) {
        next();
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async getByProductId(req, res, next) {
    try {
      const data = await productService.get(req.params.productId);
      if (data !== null) {
        next();
      } else {
        res.status(404).json({
          status: false,
          message: "Product not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },
};
