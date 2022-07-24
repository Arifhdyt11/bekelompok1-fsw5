const productService = require("../../../services/productService");

const socket = require("../../../../bin/www"); //import socket  from www

module.exports = {
  async list(req, res) {
    try {
      const data = await productService.list();
      socket.ioObject.emit("products", data);
      res.status(200).json({
        status: true,
        message: "Show all data product successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await productService.listBySeller(req.user.id);
      res.status(200).json({
        status: true,
        message: "Show all data product successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async show(req, res) {
    try {
      const data = await productService.get(req.params.id);
      res.status(200).json({
        status: true,
        message: "Successfully find data",
        data: data,
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async showBySeller(req, res) {
    try {
      const data = await productService.getBySellerId(
        req.params.id,
        req.user.id
      );
      res.status(200).json({
        status: true,
        message: "Successfully find data",
        data: data,
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const requestBody = req.body;
      const sellerId = req.user.id;
      const requestFile = req.files;

      const data = await productService.create(
        requestBody,
        sellerId,
        requestFile
      );

      res.status(200).json({
        status: true,
        message: "Product added",
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
      const productId = dataProductById.id;
      const sellerId = req.user.id;
      const requestBody = req.body;
      const requestFile = req.files;

      const data = await productService.update(
        productId,
        sellerId,
        requestBody,
        requestFile
      );
      res.status(200).json({
        status: true,
        message: "Product has been updated!",
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
      await productService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Product has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
