const { Product } = require("../models");

module.exports = {
  findAll() {
    return Product.findAll();
  },
  find(id) {
    return Product.findOne({
      where: {
        id: id,
      },
    });
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