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
