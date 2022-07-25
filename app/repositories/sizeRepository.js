const { ProductSize, Product, Size } = require("../models");

module.exports = {
  async findAll() {
    try {
      return await ProductSize.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "status"],
          },
          {
            model: Size,
            as: "sizes",
            attributes: ["id", "size"],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async find(id) {
    try {
      return await ProductSize.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "price", "image"],
          },
          {
            model: Size,
            as: "sizes",
            attributes: ["id", "size"],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async create(createArgs) {
    try {
      return await ProductSize.create(createArgs);
    } catch (error) {
      return error;
    }
  },

  async update(id, updateArgs) {
    try {
      return await ProductSize.update(updateArgs, {
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
      return await ProductSize.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
