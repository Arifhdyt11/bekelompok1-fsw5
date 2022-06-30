const { Product, Category, User, Size } = require("../models");

module.exports = {
  findAll() {
    try {
      const data = Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            as: "user",
            attributes: [
              "id",
              "role",
              "name",
              "email",
              "city",
              "address",
              "phone",
            ],
          },
        ],
      });

      if (data) {
        return data;
      }
      console.log(data);
    } catch (error) {
      return error;
    }
  },

  findById(id) {
    try {
      const data = Product.findOne({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: [
              "id",
              "role",
              "name",
              "email",
              "city",
              "address",
              "phone",
            ],
          },
        ],
        where: {
          id: id,
        },
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findBySeller(sellerId) {
    try {
      const data = Product.sellerId.findAll({
        include: [
          {
            model: User,
            attributes: [
              "id",
              "role",
              "name",
              "email",
              "city",
              "address",
              "phone",
            ],
            where: {
              id: sellerId,
            },
          },
        ],
      });

      if (data) {
        return data.sellerId;
      }
    } catch (error) {
      return error;
    }
  },

  find(id) {
    try {
      const data = Product.findOne({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["role", "name", "email", "city", "address", "phone"],
          },
          {
            model: Size,
            attributes: ["size", "stock"],
          },
        ],
        where: {
          id: id,
        },
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  create(createArgs) {
    return Product.create(createArgs);
  },

  update(id, updateArgs) {
    return Product.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Product.destroy({
      where: {
        id,
      },
    });
  },
};
