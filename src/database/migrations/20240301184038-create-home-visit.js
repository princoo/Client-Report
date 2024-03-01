import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HomeVisits', {
      id: {
        allowNull: false,
        defaultValue: uuidv4,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clientName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      UserId: {
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
    await queryInterface.dropTable('HomeVisits');
  },
};
