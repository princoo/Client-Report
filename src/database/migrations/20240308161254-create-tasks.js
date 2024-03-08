import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WeekTasks', {
      id: {
        allowNull: false,
        defaultValue: uuidv4,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      WeeklyPlanId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'WeeklyPlans',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      dueDate: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('WeekTasks');
  },
};
