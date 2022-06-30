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
        city: "Medan",
        address: "jl.medan",
        phone: "120931029",
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
        city: "Jakarta",
        address: "jl.jakarta",
        phone: "23982010",
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
        city: "Bandung",
        address: "jl.bandung",
        phone: "8239230101",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const userC = [
      {
        name: "azis",
        email: "azis@gmail.com",
        password,
        role: "SELLER",
        city: "purwakarta",
        address: "jl.purwakarta",
        phone: "8239230100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Users", userB, {});
    await queryInterface.bulkInsert("Users", userS, {});
    await queryInterface.bulkInsert("Users", userA, {});
    await queryInterface.bulkInsert("Users", userC, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
