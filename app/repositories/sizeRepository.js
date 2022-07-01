const { Size, Product, User, Category } = require("../models");

module.exports = {
  findAll() {
    return Size.findAll();
  },

  find(id) {
    return Size.findOne({
      where: {
        id: id,
      },
    });
  },

  create(createArgs) {
    return Size.create(createArgs);
  },

  update(id, updateArgs) {
    return Size.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Size.destroy({
      where: {
        id,
      },
    });
  },
};
