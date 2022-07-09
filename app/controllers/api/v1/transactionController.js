const transactionService = require("../../../services/transactionService");

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
      const data = await transactionService.getAllBySeller(req.user.id);
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

  async showByBuyer(req, res) {
    try {
      const data = await transactionService.getDetailByBuyer(req.user.id, req.params.id);
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
      const data = await transactionService.getDetailBySeller(req.user.id, req.params.id);
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
        price: req.body.price,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
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
      await transactionService.update(req.params.id, {
        status: req.body.status,
      });

      const data = await transactionService.get(req.params.id);

      res.status(200).json({
        status: true,
        message: "Transaction has been updated!",
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
