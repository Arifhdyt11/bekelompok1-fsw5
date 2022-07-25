const sizeService = require("../../../services/sizeService");
const socket = require("../../../../bin/www"); //import socket  from www

module.exports = {
  async list(req, res) {
    try {
      const data = await sizeService.list();
      res.status(200).json({
        status: true,
        message: "Show all data size successfully!",
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
      // create category
      let data = await sizeService.create({
        productId: req.body.productId,
        sizeId: req.body.sizeId,
        stock: req.body.stock,
      });
      const dataCreated = await sizeService.get(data.id);
      socket.ioObject.emit("add-sizes");
      res.status(201).json({
        status: true,
        message: "Size has been created!",
        data: dataCreated,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async show(req, res) {
    try {
      const data = await sizeService.get(req.params.id);
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      await sizeService.update(req.params.id, req.body);

      const data = await sizeService.get(req.params.id);
      socket.ioObject.emit("update-sizes");
      res.status(200).json({
        status: true,
        message: "Size has been updated!",
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
      await sizeService.delete(req.params.id);
      socket.ioObject.emit("delete-sizes");
      res.status(200).json({
        status: true,
        message: "Size has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
