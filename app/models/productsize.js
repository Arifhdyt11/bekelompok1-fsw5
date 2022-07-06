"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {
      this.hasOne(models.Transaction, { foreignKey: "productsizeId" });
      this.belongsTo(models.Product, {
        through: "Products",
        as: "products",
        foreignKey: "productId",
      });
      this.belongsTo(models.Size, {
        through: "Sizes",
        as: "sizes",
        foreignKey: "sizeId",
      });
    }
  }
  ProductSize.init(
    {
      productId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductSize",
    }
  );
  return ProductSize;
};
