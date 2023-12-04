import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.config.js";

export const Category = sequelize.define("categorys", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,

  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false, // Đảm bảo trường không được null
    unique: true, // Đảm bảo giá trị của trường là duy nhất trong bảng
  },
  description: DataTypes.STRING(2000),
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  
},{
  paranoid: true, // // Thêm paranoid để kích hoạt xóa mềm
} );



