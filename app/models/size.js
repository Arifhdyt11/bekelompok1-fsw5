"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Wishlist, { foreignKey: "sizeId" });
      this.hasMany(models.Transaction, { foreignKey: "sizeId" });

      this.belongsTo(models.Product, { 
        through: "WishlistProduct",
        as: "product",
        foreignKey: "productId" 
      });
    }
  }
  Size.init(
    {
      size: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
