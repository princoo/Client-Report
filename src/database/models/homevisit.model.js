import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import HVisitImages from './hvisitimages.model';
import User from './user.model';

const HomeVisits = sequelize.define('HomeVisits', {
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
  clientName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
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

HomeVisits.hasMany(HVisitImages, {
  as: 'HVisitImages',
  onDelete: 'cascade',
});
HomeVisits.belongsTo(User, {
  as: 'User',
  onDelete: 'cascade',
});

export default HomeVisits;
