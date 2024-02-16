/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('dailyReports', 'CatId', 'UserId');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('dailyReports', 'UserId', 'CatId');
  },
};
