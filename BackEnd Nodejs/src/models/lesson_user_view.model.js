// import { DataTypes } from "sequelize";
// import sequelize from "../configs/sequelize.config.js";

// // Tạo bảng ảo (view) bằng cách sử dụng  sequelize.query
// // sequelize.query(`
// //   CREATE VIEW lesson_user_view AS
// //   SELECT
// //     lessons_users.id,
// //     lessons_users.status,
// //     lessons_users.createdAt,
// //     lessons.name AS lesson_name,
// //     lessons.exercise AS lessons_exercise,
// //     lessons.lesson_img AS lesson_img,
// //     lessons.video AS lesson_video,
// //     courses_users.courses_name AS courses_name
// //   FROM
// //     lessons_users
// //   JOIN lessons ON lessons_users.lesson_id = lessons.id
// //   JOIN courses_users ON lessons_users.courses_user_id = courses_users.id;
// // `);


// const LessonUserView = sequelize.define(
//     'lesson_user_view', // Tên của bảng ảo
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//       },
//       status: DataTypes.STRING,
//       createdAt: DataTypes.DATE,
//       lesson_name: DataTypes.STRING,
//       lessons_exercise: DataTypes.STRING,
//       lesson_img: DataTypes.STRING,
//       lesson_video: DataTypes.STRING,
//       courses_name: DataTypes.STRING
//     },
//     {
//       freezeTableName: true, // Đảm bảo rằng tên bảng ảo không bị thay đổi
//       tableName: 'lesson_user_view', // Tên thực tế của bảng ảo trong cơ sở dữ liệu
//     //   timestamps: false, // Không cần sử dụng cột timestamps
//     }
//   );
  
//   export default LessonUserView;