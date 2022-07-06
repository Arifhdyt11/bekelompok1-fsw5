const { ProductSize, Product, Size } = require("../models");

module.exports = {
  findAll() {
    return ProductSize.findAll({
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id", "name"],
        },
        {
          model: Size,
          as: "sizes",
          attributes: ["id", "size"],
        },
      ],
    });
  },

  find(id) {
    return ProductSize.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id", "name", "price", "image"],
        },
        {
          model: Size,
          as: "sizes",
          attributes: ["id", "size"],
        },
      ],
    });
  },

  create(createArgs) {
    return ProductSize.create(createArgs);
  },

  update(id, updateArgs) {
    return ProductSize.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return ProductSize.destroy({
      where: {
        id,
      },
    });
  },
};
