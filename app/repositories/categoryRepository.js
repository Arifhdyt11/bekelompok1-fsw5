const { Category } = require("../models");

module.exports = {
  async findAll() {
    try {
      return await Category.findAll();
    } catch (error) {
      return error;
    }
  },

  async find(id) {
    try {
      return await Category.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async create(createArgs) {
    try {
      return await Category.create(createArgs);
    } catch (error) {
      return error;
    }
  },

  async update(id, updateArgs) {
    try {
      return await Category.update(updateArgs, {
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async delete(id) {
    try {
      return await Category.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  },
};