import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const SGroupImages = sequelize.define('SGroupImages', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  SupportGroupId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'SupportGroups',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

export default SGroupImages;
