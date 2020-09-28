'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('categories', 'id_stamp', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'stamps',
        key: 'id',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('categories', 'id_stamp');
  }
};
