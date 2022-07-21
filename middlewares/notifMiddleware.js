const notifService = require("../app/services/notifService");

module.exports = {
  async getById(req, res, next) {
    try {
      const data = await notifService.get(req.params.id);
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

  async isReadValidate(req, res, next) {
    try {
      const data = await notifService.get(req.params.id);

      const isReadBuyer = await data.isReadBuyer;
      const isReadSeller = await data.isReadSeller;
      if (isReadBuyer === true || isReadSeller === true) {
        res.status(400).json({
          status: false,
          message: "Notification has been read!",
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
};