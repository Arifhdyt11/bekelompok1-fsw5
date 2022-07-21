"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Product, { foreignKey: "userId" });
      this.hasOne(models.Wishlist, { foreignKey: "userId" });
      this.hasOne(models.Transaction, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      role: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      googleId: DataTypes.STRING,
      registeredVia: DataTypes.STRING,
      emailVerifiedAt: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
        values: ["inactive", "active"],
        defaultValue: "inactive",
      },
      city: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
          if (!user.image) {
            // default avatar
            let name = user.name.replaceAll(" ", "+");
            user.image = `https://ui-avatars.com/api/?name=${name}&background=4e73df&color=ffffff&size=100`;
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  return User;
};
