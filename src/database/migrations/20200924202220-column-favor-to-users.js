module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('favors', 'id_creator', {
    type: Sequelize.INTEGER,
    references: {
      model: 'residents',
      key: 'id',
      allowNull: false,
    },
  }),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('favors', 'id_creator'),
};
