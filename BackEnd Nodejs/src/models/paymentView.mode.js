import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.config.js";

// Tạo bảng ảo (view) bằng cách sử dụng  sequelize.query
// sequelize.query(`
//   CREATE VIEW paymentView AS
//   SELECT
//     payments.id,
//     payments.course_price,
//     payments.createdAt,
//     users.user_name AS user_name,
//     users.email AS user_email,
//     categorys.name AS category_name,
//     courses.name AS course_name
//   FROM
//     payments
//   JOIN users ON payments.user_id = users.id
//   JOIN categorys ON payments.category_id = categorys.id
//   JOIN courses ON payments.courses_id = courses.id;
// `);

const PaymentView = sequelize.define(
  'paymentView', // Tên của bảng ảo
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    course_price: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    category_name: DataTypes.STRING,
    course_name: DataTypes.STRING,
  },
  {
    freezeTableName: true, // Đảm bảo rằng tên bảng ảo không bị thay đổi
    tableName: 'paymentView', // Tên thực tế của bảng ảo trong cơ sở dữ liệu
    timestamps: false, // Không cần sử dụng cột timestamps
  }
);

export default PaymentView;