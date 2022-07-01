const { Wishlist, Size, User, Product } = require("../models");

module.exports = {
  findAll() {
    return Wishlist.findAll();
  },

  findByBuyer() {
    try {
      const data = Wishlist.findAll({
        include: [
          {
            model: Size,
            as: "sizes",
            include: [
              {
                model: Product,
                as: "products",
              },
            ],
          },
          {
            model: User,
            as: "users",
            where: {
              role: "BUYER",
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

  findBySeller() {
    try {
      const data = Wishlist.findAll({
        include: [
          {
            model: Size,
            as: "sizes",
            include: [
              {
                model: Product,
                as: "products",
                include: [
                  {
                    model: User,
                    as: "users",
                    where: {
                      role: "SELLER",
                    },
                  },
                ],
              },
            ],
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
      const data = Wishlist.findOne({
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
