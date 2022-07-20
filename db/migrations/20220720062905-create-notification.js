'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Transactions",
          key: "id",
        },
      },
      isReadBuyer: {
        type: Sequelize.BOOLEAN
      },
      isReadSeller: {
        type: Sequelize.BOOLEAN
      },
      message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};