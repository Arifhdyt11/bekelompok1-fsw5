"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      googleId: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      registeredVia: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      emailVerifiedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: true,
        defaultValue: "inactive",
        type: Sequelize.STRING,
      },
      province: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
