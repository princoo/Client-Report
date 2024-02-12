/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: false, // Adjust this based on your requirements
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'phone');
  },
};
