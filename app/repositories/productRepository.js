const { Product, Category, User } = require("../models");

module.exports = {
  async findAll() {
    try {
      return await Product.findAll({
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["name"],
          },
        ],
        attributes: [
          "id",
          "name",
          "image",
          "price",
          "status",
          "createdAt",
          "updatedAt",
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async findByIdCreate(id) {
    try {
      return await Product.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async findById(id) {
    try {
      return await Product.findOne({
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: User,
            as: "userAsSeller",
            attributes: [
              "id",
              "role",
              "name",
              "city",
              "address",
              "phone",
              "image",
            ],
          },
        ],
        where: {
          id: id,
        },
        attributes: ["id", "name", "image", "price", "description", "status"],
      });
    } catch (error) {
      return error;
    }
  },

  async findBySellerId(id, sellerId) {
    try {
      return await Product.findOne({
        where: {
          id: id,
          userId: sellerId,
        },
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: User,
            as: "userAsSeller",
            attributes: [
              "id",
              "role",
              "name",
              "city",
              "address",
              "phone",
              "image",
            ],
          },
        ],
        attributes: [
          "id",
          "name",
          "image",
          "categoryId",
          "price",
          "description",
          "status",
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async findBySeller(sellerId) {
    try {
      return await Product.findAll({
        where: {
          userId: sellerId,
        },
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["name"],
          },
        ],
        attributes: ["id", "name", "image", "price", "status", "updatedAt"],
      });
    } catch (error) {
      return error;
    }
  },

  async create(createArgs) {
    return await Product.create(createArgs);
  },

  async update(id, updateArgs) {
    return await Product.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  async delete(id) {
    return await Product.destroy({
      where: {
        id,
      },
    });
  },
};
