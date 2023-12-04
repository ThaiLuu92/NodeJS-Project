import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.config.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  dob: {
    type: DataTypes.DATE,
  },
  address: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING(10),
  },
  level: {
    type: DataTypes.STRING(10),
  },
  avatar: {
    type: DataTypes.TEXT,
  },
  avatarPublicId: {
    type: DataTypes.STRING(50),
  },
  resetPassword: {
    type: DataTypes.STRING,
    allowNull: true, // Cho phép giá trị null khi không có yêu cầu đặt lại mật khẩu
  },
  resetPasswordExpiry: {
    type: DataTypes.DATE,
  },
});

export default User;
