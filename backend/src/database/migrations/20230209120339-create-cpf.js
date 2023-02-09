'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cpfTable = await queryInterface.createTable('cpf', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },  
    })
    return cpfTable
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable('cpf')
  }
}