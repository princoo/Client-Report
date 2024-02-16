import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Sites = sequelize.define('Sites', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Sites;
