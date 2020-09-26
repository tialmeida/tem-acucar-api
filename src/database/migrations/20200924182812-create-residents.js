module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('residents', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_building: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'buildings',
        key: 'id',
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ap_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('residents'),
};
