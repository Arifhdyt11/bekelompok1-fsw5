'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction, {
        through: "Notif_Transactions",
        as: "transactions",
        foreignKey: "transactionId",
      });
    }
  }
  Notification.init({
    transactionId: DataTypes.INTEGER,
    isReadBuyer: DataTypes.BOOLEAN,
    isReadSeller: DataTypes.BOOLEAN,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};