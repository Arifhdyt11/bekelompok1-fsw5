const notifService = require("../../../services/notifService");

module.exports = {
  async list(req, res) {
    try {
      const data = await notifService.list();
      res.status(200).json({
        status: true,
        message: "Show all data notification successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listByBuyer(req, res) {
    try {
      const data = await notifService.getAllByBuyer(req.user.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find all data notification",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await notifService.getAllBySeller(req.user.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find all data notification",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateBuyer(req, res) {
    try {
      await notifService.update(req.params.id, {
        isReadBuyer: req.body.isReadBuyer,
      });

      const data = await notifService.get(req.params.id);

      res.status(200).json({
        status: true,
        message: "isReadBuyer has been updated!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateSeller(req, res) {
    try {
      await notifService.update(req.params.id, {
        isReadSeller: req.body.isReadSeller,
      });

      const data = await notifService.get(req.params.id);

      res.status(200).json({
        status: true,
        message: "isReadSeller has been updated!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateAllBuyer(req, res) {
    try {
      await notifService.updateAllBuyer(req.user.id);

      const data = await notifService.getAllByBuyer(req.user.id);

      res.status(200).json({
        status: true,
        message: "isReadBuyer has been updated!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateAllSeller(req, res) {
    try {
      await notifService.updateAllSeller(req.user.id);

      const data = await notifService.getAllBySeller(req.user.id);

      res.status(200).json({
        status: true,
        message: "isReadBuyer has been updated!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      await notifService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Notification has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
