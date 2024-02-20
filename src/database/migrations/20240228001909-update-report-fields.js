/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('dailyReports', 'discussedIssues', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('dailyReports', 'discussedIssues', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
