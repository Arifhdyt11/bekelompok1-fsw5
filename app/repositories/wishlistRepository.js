const { Wishlist, User, Product, Category } = require("../models");

module.exports = {
  findAll() {
    return Wishlist.findAll();
  },

  findWishlistBuyerById(id) {
    try {
      const data = Wishlist.findAll({
        include: [
          {
            model: Product,
            as: "products",
            include: [
              {
                model: Category,
                as: "categories",
                attributes: ["name"],
              },
              {
                model: User,
                as: "userAsSeller",
                attributes: ["name", "city", "image"],
              },
            ],
            attributes: ["id", "name", "image", "price", "status"],
          },
          {
            model: User,
            as: "userAsBuyer",
            where: {
              role: "BUYER",
              id: id,
            },
            attributes: [],
          },
        ],
        attributes: ["id", "productId"],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findWishlistSellerById(id) {
    try {
      const data = Wishlist.findAll({
        include: [
          {
            model: Product,
            as: "products",
            where: {
              userId: id,
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
                where: {
                  role: "SELLER",
                  id: id,
                },
                attributes: [],
              },
            ],
            attributes: ["id", "name", "image", "price"],
          },
        ],
        attributes: ["id"],
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

  delete(id) {
    return Wishlist.destroy({
      where: {
        id,
      },
    });
  },
};
