'use strict';

const bcrypt = require('bcrypt')
const { Role } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    const pass = "1234"
    const password = bcrypt.hashSync(pass, 10)
    const timestamp = new Date()

    const roleB = await Role.findOne({
      where: {
        name: "BUYER",
      }
    })

    const roleS = await Role.findOne({
      where: {
        name: "SELLER",
      }
    })

    const userB = [{
      name: 'raihan',
      email: 'raihan@gmail.com',
      password,
      roleId: roleB.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }]

    const userS = [{
      name: 'iqbal',
      email: 'iqbal@gmail.com',
      password,
      roleId: roleS.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }]

    await queryInterface.bulkInsert('Users', userB, {})
    await queryInterface.bulkInsert('Users', userS, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
