const { transaction, Product } = require("../models");

module.exports = {
  findByBuyer(buyerId) {
    try {
      const data = transaction.findAll({
        include: [{ model: Product }],
        where: {
          userId: buyerId,
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
      const data = transaction.findAll({
        include: [
          {
            model: Product,
            as: "products",
            where: {
              userId: sellerId,
            },
          },
        ],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findProductByUser(userId, productId) {
    try {
      const data = transaction.findOne({
        where: {
          userId: userId,
          productId: productId,
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
    return Wishlist.create(createArgs);
  },

  update(id, updateArgs) {
    return Wishlist.update(updateArgs, {
      where: {
        id,
      },
    });
  },
  delete(id) {
    return Wishlist.destroy({
      where: {
        id,
      },
    });
  },
};
