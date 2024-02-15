/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('Users', 'site', 'SiteId');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('Users', 'SiteId', 'site');
  },
};
