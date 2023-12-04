import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.config.js";

const Favorite = sequelize.define('favorites', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courses_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  export default Favorite;