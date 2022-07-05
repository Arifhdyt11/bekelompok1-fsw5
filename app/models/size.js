"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      this.hasMany(models.ProductSize, { foreignKey: "sizeId" });
    }
  }
  Size.init(
    {
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
