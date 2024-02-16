import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Sites from './sites.model';

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
  SiteId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Sites',
      key: 'id',
    },
    onDelete: 'CASCADE',
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

User.belongsTo(Sites, { onDelete: 'cascade' });
export default User;
