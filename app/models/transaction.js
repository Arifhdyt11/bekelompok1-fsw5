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
        as: "userAsBuyer",
        foreignKey: "userId",
      });
    }
  }
  Transaction.init(
    {
      productsizeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      price: DataTypes.STRING,
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
