import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dailyReports', {
      id: {
        allowNull: false,
        defaultValue: uuidv4,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activityDone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discussedIssues: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CatId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('dailyReports');
  },
};
