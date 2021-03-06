const transactionService = require("../../../services/transactionService");
const sizeService = require("../../../services/sizeService");
const notifService = require("../../../services/notifService");
const socket = require("../../../../bin/www"); //import socket  from www

module.exports = {
  async list(req, res) {
    try {
      const data = await transactionService.list();
      res.status(200).json({
        status: true,
        message: "Show all data transaction successfully!",
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
      const data = await transactionService.getAllByBuyer(req.user.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find all data transaction",
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
      const dataTransaction = await transactionService.getAllBySeller(
        req.user.id
      );
      if (dataTransaction) {
        res.status(200).json({
          status: true,
          message: "Successfully find all data transaction",
          data: dataTransaction,
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

  async showByBuyer(req, res) {
    try {
      const data = await transactionService.getDetailByBuyer(
        req.user.id,
        req.params.id
      );
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find data transaction",
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

  async showBySeller(req, res) {
    try {
      const data = await transactionService.getDetailBySeller(
        req.user.id,
        req.params.id
      );
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find data transaction",
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

  async create(req, res) {
    try {
      const data = await transactionService.create({
        productsizeId: req.body.productsizeId,
        userId: req.user.id,
        priceBid: req.body.priceBid,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const createNotif = await notifService.create({
        transactionId: data.id,
        isReadBuyer: false,
        isReadSeller: false,
        message: "You have new transaction",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const transactionCreated = await transactionService.get(data.id);
      socket.ioObject.emit("add-transaction", createNotif);
      res.status(200).json({
        status: true,
        message: "Transaction has been added!",
        data: transactionCreated,
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
      await transactionService.update(req.params.id, {
        status: req.body.status,
      });

      let updatedStatus = await transactionService.get(req.params.id);

      console.log(req.params.id);

      let data = await sizeService.get(updatedStatus.productsizeId);

      let stock = data.stock;

      if (updatedStatus.status === "process") {
        var newStock = stock - 1;
      } else if (updatedStatus.status === "cancel") {
        var newStock = stock + 1;
      }

      if (
        !updatedStatus.status === "process" ||
        !updatedStatus.status === "cancel"
      ) {
        res.status(200).json({
          status: true,
          message: "Transaction has been updated!",
          data: updatedStatus,
        });
      }
      await sizeService.update(data.id, {
        stock: newStock,
      });

      const updateNotif = await notifService.create({
        transactionId: updatedStatus.id,
        isReadBuyer: false,
        isReadSeller: false,
        message: "Transaction has been " + updatedStatus.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      socket.ioObject.emit("update-transaction", updateNotif);
      res.status(200).json({
        status: true,
        message: "Transaction has been updated!",
        data: updatedStatus,
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
      await transactionService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Transaction has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
