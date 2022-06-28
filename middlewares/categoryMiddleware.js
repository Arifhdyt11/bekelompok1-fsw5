const categoryService = require("../app/services/categoryService");

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
      const data = await categoryService.get(req.params.id);
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
