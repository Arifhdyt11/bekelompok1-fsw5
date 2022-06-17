const productService = require("../app/services/productService");

module.exports = {
  async nameValidate(req, res, next) {
    try {
      const data = await req.body.name;
      if (data == null || data == "") {
        res.status(400).json({
          status: false,
          message: "Name are required!",
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
        message: err.message,
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
