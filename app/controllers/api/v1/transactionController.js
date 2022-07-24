const transactionService = require("../../../services/transactionService");
const sizeService = require("../../../services/sizeService");
const notifService = require("../../../services/notifService");
const socket = require("../../../../bin/www"); //import socket  from www

module.exports = {
  async listByBuyer(req, res) {
    try {
      const data = await transactionService.getAllByBuyer(req.user.id);

      res.status(200).json({
        status: true,
        message: "Successfully find all data transaction",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await transactionService.getAllBySeller(req.user.id);

      res.status(200).json({
        status: true,
        message: "Successfully find all data transaction",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async showByBuyer(req, res) {
    try {
      const data = await transactionService.getDetailByBuyer(
        req.user.id,
        req.params.id
      );

      res.status(200).json({
        status: true,
        message: "Successfully find data transaction",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async showBySeller(req, res) {
    try {
      const data = await transactionService.getDetailBySeller(
        req.user.id,
        req.params.id
      );

      res.status(200).json({
        status: true,
        message: "Successfully find data transaction",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const data = await transactionService.create(req.body, req.user.id);
      await notifService.create(data.id);
      socket.ioObject.emit("add-transaction");

      res.status(200).json({
        status: true,
        message: "Transaction has been added!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const data = await transactionService.update(req.params.id, req.body);
      await notifService.updateStatusTransaction(data.id, data.status);
      socket.ioObject.emit("update-transaction");

      res.status(200).json({
        status: true,
        message: "Transaction has been updated!",
        data: data,
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },
};
