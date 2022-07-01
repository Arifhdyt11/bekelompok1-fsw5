const { Size, Product, User, Category } = require("../models");

module.exports = {
  findAll() {
    return Size.findAll({
      include: [
        {
          model: Product,
          as: "product",
          include: [
            { model: User, as: "users" },
            { model: Category, as: "categories" },
          ],
        },
      ],
    });
  },

  find(id) {
    return Size.findOne({
      where: {
        id: id,
      },
    });
  },

  create(createArgs) {
    return Size.create(createArgs, {
      include: [{ model: Product, as: "products" }],
    });
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
