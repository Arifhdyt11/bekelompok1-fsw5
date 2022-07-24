const { Wishlist, User, Product, Category } = require("../models");

module.exports = {
  async findAll() {
    try {
      return await Wishlist.findAll();
    } catch (error) {
      return error;
    }
  },

  async findWishlistBuyerById(id) {
    try {
      return await Wishlist.findAll({
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
    } catch (error) {
      return error;
    }
  },

  async findWishlistSellerById(id) {
    try {
      return await Wishlist.findAll({
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
    } catch (error) {
      return error;
    }
  },

  async findProductByUser(userId, productId) {
    try {
      return await Wishlist.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async create(createArgs) {
    try {
      return await Wishlist.create(createArgs);
    } catch (error) {
      return error;
    }
  },

  async delete(id) {
    try {
      return await Wishlist.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  },
};