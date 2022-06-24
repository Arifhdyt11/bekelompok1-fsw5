"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Transaction, { foreignKey: "productId" });
      this.hasOne(models.Wishlist, { foreignKey: "productId" });

      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
      this.belongsTo(models.Size, { foreignKey: "sizeId" });
    }
  }
  Product.init(
    {
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
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
