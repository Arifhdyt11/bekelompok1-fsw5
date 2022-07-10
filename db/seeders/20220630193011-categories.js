"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const categoryA = [
      {
        name: "Sneakers",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryB = [
      {
        name: "Sports",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryC = [
      {
        name: "Casuals",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryD = [
      {
        name: "Boots",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryE = [
      {
        name: "Formals",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Categories", categoryA, {});
    await queryInterface.bulkInsert("Categories", categoryB, {});
    await queryInterface.bulkInsert("Categories", categoryC, {});
    await queryInterface.bulkInsert("Categories", categoryD, {});
    await queryInterface.bulkInsert("Categories", categoryE, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
