import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const HVisitImages = sequelize.define('HVisitImages', {
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
  HomeVisitId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'HomeVisits',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

export default HVisitImages;
