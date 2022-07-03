"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        through: "Wishlist_Product",
        as: "products",
        foreignKey: "productId",
      });

      this.belongsTo(models.User, {
        through: "Wishlist_Product",
        as: "user as buyer",
        foreignKey: "userId",
      });
    }
  }
  Wishlist.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
