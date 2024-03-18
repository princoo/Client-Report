import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import WeeklyPlan from './weeklyplan';

const WeekTasks = sequelize.define('WeekTasks', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'COMPLETED'),
    allowNull: false,
    defaultValue: 'PENDING',
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
});

WeekTasks.belongsTo(WeeklyPlan, { onDelete: 'cascade' });

export default WeekTasks;
