"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {
      this.hasOne(models.Transaction, { foreignKey: "productsizeId" });
      this.belongsToMany(models.Product, {
        through: "Product_Sizes",
        as: "products",
        foreignKey: "productId",
      });
      this.belongsToMany(models.Size, {
        through: "Product_Sizes",
        as: "sizes",
        foreignKey: "sizeId",
      });
    }
  }
  ProductSize.init(
    {
      productId: DataTypes.STRING,
      sizeId: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductSize",
    }
  );
  return ProductSize;
};
