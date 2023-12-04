// Trong file course.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';

const Course_User = sequelize.define('courses_user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courses_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courses_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
});



export default Course_User;


// (async () => {
//   await Course_User.sync({alter:true}); 
//   ;
// })();