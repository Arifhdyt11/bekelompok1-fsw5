"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {
      this.hasOne(models.Transaction, { foreignKey: "productSizeId" });
      this.belongsTo(models.Product, {
        through: "Products",
        as: "product_productSizes",
        foreignKey: "productId",
      });
      this.belongsTo(models.Size, {
        through: "Sizes",
        as: "size_productSizes",
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
