import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
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
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
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
});

export default User;
