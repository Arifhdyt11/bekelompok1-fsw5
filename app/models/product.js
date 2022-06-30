"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasOne(models.Wishlist, { foreignKey: "productId" });
      this.hasMany(models.ProductSize, { foreignKey: "productId" });

      this.belongsTo(models.User, {
        through: "SellerProducts",
        as: "users",
        foreignKey: "userId",
      });

      this.belongsTo(models.Category, {
        through: "CategoryProducts",
        as: "categories",
        foreignKey: "categoryId",
      });
    }
  }
  Product.init(
    {
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
