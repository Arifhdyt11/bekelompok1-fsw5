const {
  Notification,
  Transaction,
  ProductSize,
  Product,
  Category,
} = require("../models");

module.exports = {
  async findAll() {
    return await Notification.findAll();
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
    return await Notification.findOne({
      where: {
        id: id,
      },
    });
  },

  async create(createArgs) {
    return await Notification.create(createArgs);
  },

  async update(id, updateArgs) {
    return await Notification.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  async updateAllBuyer() {
    return await Notification.update(
      { isReadBuyer: true },
      {
        where: {
          isReadBuyer: false,
        },
      }
    );
  },

  async updateAllSeller() {
    return await Notification.update(
      { isReadSeller: true },
      {
        where: {
          isReadSeller: false,
        },
      }
    );
  },

  async delete(id) {
    return await Notification.destroy({
      where: {
        id,
      },
    });
  },
};
