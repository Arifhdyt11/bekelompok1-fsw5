"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const pass = "password";
    const password = bcrypt.hashSync(pass, 10);
    const timestamp = new Date();

    const sellerA = [
      {
        role: "SELLER",
        name: "SELLER A",
        email: "seller1@binar.com",
        password,
        city: "Medan",
        address: "jl.medan",
        phone: "8123456790",
        image: "https://picsum.photos/200/300",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sellerB = [
      {
        role: "SELLER",
        name: "SELLER B",
        email: "seller2@binar.com",
        password,
        city: "Jakarta",
        address: "jl.jakarta",
        phone: "8123456790",
        image: "https://picsum.photos/200/300",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const sellerC = [
      {
        role: "SELLER",
        name: "SELLER C",
        email: "seller3@binar.com",
        password,
        city: "Bandung",
        address: "jl.bandung",
        phone: "8123456790",
        image: "https://picsum.photos/200/300",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const buyerA = [
      {
        role: "BUYER",
        name: "BUYER A",
        email: "buyer1@binar.com",
        password,
        city: "purwakarta",
        address: "jl.purwakarta",
        phone: "8123456790",
        image: "https://picsum.photos/200/300",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const buyerB = [
      {
        role: "BUYER",
        name: "BUYER B",
        email: "buyer2@binar.com",
        password,
        city: "semarang",
        address: "jl.semarang",
        phone: "8123456790",
        image: "https://picsum.photos/200/300",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const buyerC = [
      {
        role: "BUYER",
        name: "BUYER C",
        email: "buyer3@binar.com",
        password,
        city: "surabaya",
        address: "jl.surabaya",
        phone: "8123456790",
        image: "https://picsum.photos/200/300",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Users", sellerA, {});
    await queryInterface.bulkInsert("Users", sellerB, {});
    await queryInterface.bulkInsert("Users", sellerC, {});

    await queryInterface.bulkInsert("Users", buyerA, {});
    await queryInterface.bulkInsert("Users", buyerB, {});
    await queryInterface.bulkInsert("Users", buyerC, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
