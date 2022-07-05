const { ProductSize, Product, Size } = require("../models");

module.exports = {
  findAll() {
    return ProductSize.findAll();
  },

  find(id) {
    return ProductSize.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Product,
          as: "product_productSizes",
          attributes: ["id", "name", "price", "image"],
        },
        {
          model: Size,
          as: "size_productSizes",
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
