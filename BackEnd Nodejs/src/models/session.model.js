import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';

const Session = sequelize.define('sessions', {
  session_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
  },
  data: {
    type: DataTypes.TEXT,
  },
});

export default Session;
