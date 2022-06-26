"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("Products", "sizeId");
    await queryInterface.changeColumn("Products", "image", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("Products", "sizeId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Sizes",
        key: "id",
      },
    });
    await queryInterface.changeColumn("Products", "image", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: [],
    });
  },
};
