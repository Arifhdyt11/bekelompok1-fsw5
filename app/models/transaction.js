"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.ProductSize, {
        through: "Product_Transactions",
        as: "productsizes",
        foreignKey: "productsizeId",
      });
      this.belongsTo(models.User, {
        through: "Product_Transactions",
        as: "users",
        foreignKey: "userId",
      });
    }
  }
  Transaction.init(
    {
      productsizeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      priceBid: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        values: ["pending", "success", "cancel"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
