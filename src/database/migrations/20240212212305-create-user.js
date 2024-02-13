import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        defaultValue: uuidv4,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('CATS', 'CATS_MENTOR'),
        defaultValue: 'CATS',
      },
      status: {
        type: DataTypes.ENUM('INACTIVE', 'ACTIVE'),
        defaultValue: 'ACTIVE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
