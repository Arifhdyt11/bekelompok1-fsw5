const { Wishlist, User, Product, Category } = require("../models");

module.exports = {
  findAll() {
    return Wishlist.findAll();
  },

  findWishlistBuyerById(id){
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
            ],
          },
          {
            model: User,
            as: "user as buyer",
            where: {
              role: "BUYER",
              id: id,
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

  findWishlistSellerById(id){
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
                as: "user as seller",
                where: {
                  role: "SELLER",
                  id: id,
                },
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
