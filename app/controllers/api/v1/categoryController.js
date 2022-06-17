const categoryService = require("../../../services/categoryService");

module.exports = {
  async list(req, res) {
    try {
      const data = await categoryService.list();
      res.status(200).json({
        status: true,
        message: "Show all data category successfully!",
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
      // create car
      const data = await categoryService.create({
        name: req.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        status: true,
        message: "Category has been created!",
        data: data,
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
      const data = await categoryService.get(req.params.id);
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
      await categoryService.update(req.params.id, req.body);

      const data = await categoryService.get(req.params.id);

      // get Log info
      res.status(200).json({
        status: true,
        message: "Category has been updated!",
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
      await categoryService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Category has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};