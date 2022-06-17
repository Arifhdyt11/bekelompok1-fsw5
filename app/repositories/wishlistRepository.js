const { Wishlist } = require("../models");

module.exports = {
  findAll() {
    return Wishlist.findAll();
  },

  find(id) {
    return Wishlist.findOne({
      where: {
        id: id,
      },
    });
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
      } else {
        return;
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
