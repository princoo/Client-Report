import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

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

export default WeekTasks;
