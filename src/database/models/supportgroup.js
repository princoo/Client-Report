import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
// import Collection from './collection.model.js';
import SGroupImages from './sgroupimages';
import User from './user.model';

const SupportGroups = sequelize.define('SupportGroups', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  UserId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

SupportGroups.hasMany(SGroupImages, {
  as: 'SGroupImages',
  onDelete: 'cascade',
});
SupportGroups.belongsTo(User, {
  as: 'User',
  onDelete: 'cascade',
});

export default SupportGroups;
