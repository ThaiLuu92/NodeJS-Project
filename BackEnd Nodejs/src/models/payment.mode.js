import { DataTypes,literal } from "sequelize";
import sequelize from "../configs/sequelize.config.js";
import User from "./user.model.js";
import { Category } from "./category.model.js";
import Course from "./course.model.js";

const Payment = sequelize.define("payments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  course_price: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courses_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

export default Payment;


