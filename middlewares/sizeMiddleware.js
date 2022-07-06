const sizeService = require("../app/services/sizeService");

module.exports = {
  async valuesValidate(req, res, next) {
    try {
      const size = await req.body.sizeId;
      const stock = await req.body.stock;
      if (size == null || size == "" || stock == null || stock < 0) {
        res.status(400).json({
          status: false,
          message: "Values size and stock are required!",
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
      const data = await sizeService.get(req.params.id);
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
};
