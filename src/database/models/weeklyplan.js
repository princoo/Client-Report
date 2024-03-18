import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
// import WeekTasks from './tasks';
import User from './user.model';

const WeeklyPlan = sequelize.define('WeeklyPlans', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
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

WeeklyPlan.belongsTo(User, {
  onDelete: 'cascade',
});

export default WeeklyPlan;
