const {
  Notification,
  Transaction,
  ProductSize,
  Product,
  Category,
} = require("../models");

module.exports = {
  async findAll() {
    try {
      return await Notification.findAll();
    } catch (error) {
      return error;
    }
  },

  async findByBuyer(id) {
    try {
      return await Notification.findAll({
        include: [
          {
            model: Transaction,
            as: "transactions",
            include: [
              {
                model: ProductSize,
                as: "productSizes",
                include: [
                  {
                    model: Product,
                    as: "products",
                    attributes: ["name", "image", "price"],
                    include: [
                      {
                        model: Category,
                        as: "categories",
                        attributes: ["name"],
                      },
                    ],
                  },
                ],
                attributes: ["productId"],
              },
            ],
            where: {
              userId: id,
            },
            attributes: ["priceBid", "status"],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async findBySeller(id) {
    try {
      return await Notification.findAll({
        where: { "$transactions.productSizes.products.userId$": id },
        include: [
          {
            model: Transaction,
            as: "transactions",
            include: [
              {
                model: ProductSize,
                as: "productSizes",
                include: [
                  {
                    model: Product,
                    as: "products",
                    attributes: ["name", "image", "price"],
                    include: [
                      {
                        model: Category,
                        as: "categories",
                        attributes: ["name"],
                      },
                    ],
                  },
                ],
                attributes: ["productId"],
              },
            ],
            attributes: ["priceBid", "status"],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async find(id) {
    try {
      return await Notification.findOne({
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
      return await Notification.create(createArgs);
    } catch (error) {
      return error;
    }
  },

  async update(id, updateArgs) {
    try {
      return await Notification.update(updateArgs, {
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async updateAllBuyer() {
    try {
    return await Notification.update(
      { isReadBuyer: true },
      {
        where: {
          isReadBuyer: false,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async updateAllSeller() {
    try {
    return await Notification.update(
      { isReadSeller: true },
      {
        where: {
          isReadSeller: false,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async delete(id) {
    try {
      return await Notification.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
