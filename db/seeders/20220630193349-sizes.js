"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const sizeA = [
      {
        size: "36",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeB = [
      {
        size: "37",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeC = [
      {
        size: "38",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeD = [
      {
        size: "39",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeE = [
      {
        size: "40",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeF = [
      {
        size: "41",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeG = [
      {
        size: "42",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeH = [
      {
        size: "43",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeI = [
      {
        size: "44",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sizeJ = [
      {
        size: "45",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Sizes", sizeA, {});
    await queryInterface.bulkInsert("Sizes", sizeB, {});
    await queryInterface.bulkInsert("Sizes", sizeC, {});
    await queryInterface.bulkInsert("Sizes", sizeD, {});
    await queryInterface.bulkInsert("Sizes", sizeE, {});
    await queryInterface.bulkInsert("Sizes", sizeF, {});
    await queryInterface.bulkInsert("Sizes", sizeG, {});
    await queryInterface.bulkInsert("Sizes", sizeH, {});
    await queryInterface.bulkInsert("Sizes", sizeI, {});
    await queryInterface.bulkInsert("Sizes", sizeJ, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sizes", null, {});
  },
};
