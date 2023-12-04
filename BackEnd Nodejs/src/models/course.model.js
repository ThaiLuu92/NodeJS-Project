// Trong file course.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';

const Course = sequelize.define('courses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  level: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  course_img: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  category_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  paranoid: true, // // Thêm paranoid để kích hoạt xóa mềm
});



export default Course;
