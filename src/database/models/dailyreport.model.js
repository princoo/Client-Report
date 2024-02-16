import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

const DailyReport = sequelize.define('dailyReports', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
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

DailyReport.belongsTo(User, { onDelete: 'cascade' });

export default DailyReport;
