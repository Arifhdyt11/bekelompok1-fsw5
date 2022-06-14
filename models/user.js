'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Product, { foreignKey: 'userId' })
      this.hasMany(models.Wishlist, { foreignKey: 'userId' })
      this.hasOne(models.Transaction, { foreignKey: 'userId' })

      this.belongsTo(models.Role, { foreignKey: 'roleId' })
    }
  }
  User.init({
    roleId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};