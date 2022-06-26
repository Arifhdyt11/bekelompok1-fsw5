"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn("Transactions", "price", "priceBid");
    // drop constraint
    await queryInterface.removeConstraint(
      "Transactions",
      "Transactions_productId_fkey"
    );
    await queryInterface.renameColumn("Transactions", "productId", "sizeId");
    // add constraint
    await queryInterface.addConstraint("Transactions", {
      type: "FOREIGN KEY",
      name: "Transactions_sizeId_fkey",
      fields: ["sizeId"],
      references: {
        table: "Sizes",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn("Transactions", "priceBid", "price");
    // remove constraint
    await queryInterface.removeConstraint(
      "Transactions",
      "Transactions_sizeId_fkey"
    );
    await queryInterface.renameColumn("Transactions", "sizeId", "productId");
    // add constraint
    await queryInterface.addConstraint("Transactions", {
      type: "FOREIGN KEY",
      name: "Transactions_productId_fkey",
      fields: ["productId"],
      references: {
        table: "Products",
        field: "id",
      },
    });
  },
};
