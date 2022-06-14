'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const names = [
      "BUYER",
      "SELLER"
    ]

    const timestamp = new Date()
    const records = names.map((name) => ({
      name,
      createdAt: timestamp,
      updatedAt: timestamp
    }))

    await queryInterface.bulkInsert('Roles', records, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
};
