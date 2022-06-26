"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Size, { foreignKey: "sizeId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Transaction.init(
    {
      sizeId: DataTypes.INTEGER,
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
