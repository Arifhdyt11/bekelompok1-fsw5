"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // remove constraint
    await queryInterface.removeConstraint(
      "Wishlists",
      "Wishlists_productId_fkey"
    );
    await queryInterface.renameColumn("Wishlists", "productId", "sizeId");
    // add constraint
    await queryInterface.addConstraint("Wishlists", {
      type: "FOREIGN KEY",
      name: "Wishlists_sizeId_fkey",
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
    // remove constraint
    await queryInterface.removeConstraint("Wishlists", "Wishlists_sizeId_fkey");
    await queryInterface.renameColumn("Wishlists", "sizeId", "productId");
    // add constraint
    await queryInterface.addConstraint("Wishlists", {
      type: "FOREIGN KEY",
      name: "Wishlists_productId_fkey",
      fields: ["productId"],
      references: {
        table: "Products",
        field: "id",
      },
    });
  },
};
