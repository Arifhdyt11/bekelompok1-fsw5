const { Category } = require("../models");

module.exports = {
  findAll() {
    return Category.findAll();
  },

  find(id) {
    return Category.findOne({
      where: {
        id: id,
      },
    });
  },

  create(createArgs) {
    return Category.create(createArgs);
  },

  update(id, updateArgs) {
    return Category.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Category.destroy({
      where: {
        id,
      },
    });
  },
};