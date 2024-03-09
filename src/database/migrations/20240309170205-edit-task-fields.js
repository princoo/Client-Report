/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('WeekTasks', 'status', {
      type: Sequelize.ENUM('PENDING', 'COMPLETED'),
      allowNull: false,
      defaultValue: 'PENDING',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('WeekTasks', 'status');
  },
};
