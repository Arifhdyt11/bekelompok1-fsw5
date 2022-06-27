const sizeService = require("../app/services/sizeService");

module.exports = {
  async nameValidate(req, res, next) {
    try {
      const data = await req.body.size && req.body.stock;
      if (data == null || data == "") {
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
