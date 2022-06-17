"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const pass = "1234";
    const password = bcrypt.hashSync(pass, 10);
    const timestamp = new Date();

    const userB = [
      {
        name: "raihan",
        email: "raihan@gmail.com",
        password,
        role: "BUYER",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const userA = [
      {
        name: "Hasan",
        email: "hafizhhasan@gmail.com",
        password,
        role: "BUYER",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const userS = [
      {
        name: "iqbal",
        email: "iqbal@gmail.com",
        password,
        role: "SELLER",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Users", userB, {});
    await queryInterface.bulkInsert("Users", userS, {});
    await queryInterface.bulkInsert("Users", userA, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
