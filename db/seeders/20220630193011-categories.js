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
        name: "Sport",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryC = [
      {
        name: "Casual",
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

    await queryInterface.bulkInsert("Categories", categoryA, {});
    await queryInterface.bulkInsert("Categories", categoryB, {});
    await queryInterface.bulkInsert("Categories", categoryC, {});
    await queryInterface.bulkInsert("Categories", categoryD, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
