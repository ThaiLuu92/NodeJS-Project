import { DataTypes } from "sequelize";
import sequelize from "../configs/sequelize.config.js";

// Tạo bảng ảo (view) bằng cách sử dụng  sequelize.query
// sequelize.query(`
//   CREATE VIEW course_user_view AS
//   SELECT
//     courses_users.id,
//     courses_users.status,
//     courses_users.courses_name,
//     courses_users.createdAt,
//     users.user_name AS user_name,
//     users.id AS user_id,
//     courses.course_img AS course_img,
//     courses.id AS course_id
//   FROM
//     courses_users
//   JOIN users ON courses_users.user_id = users.id
//   JOIN courses ON courses_users.courses_id = courses.id;
// `);

const CoureUserView = sequelize.define(
    'course_user_view', // Tên của bảng ảo
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      status: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      user_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      courses_name: DataTypes.STRING,
      course_img: DataTypes.STRING,
      course_id: DataTypes.STRING,
    },
    {
      freezeTableName: true, // Đảm bảo rằng tên bảng ảo không bị thay đổi
      tableName: 'course_user_view', // Tên thực tế của bảng ảo trong cơ sở dữ liệu
      timestamps: false, // Không cần sử dụng cột timestamps
    }
  );
  
  export default CoureUserView;


//   (async () => {
//     await sequelize.sync({alert:true}); 
//     ;
//   })();