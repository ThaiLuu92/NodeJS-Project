import {
    getData,
    insertData,
    getDataById,
    getDataWhereCondition,
    editData,
} from "../../utils/data.util.js";
import Course_User from "../models/course_user.model.js";
import CoureUserView from "../models/course_user_view.model.js";

export default class CourseUserRepository {
    async getCourseUser() {
        try {
            const courseData = await getData(CoureUserView);
            return courseData;
        } catch (error) {
            throw error;
        }
    }

    async getCourseUserById(id) {
        try {
            const courseById = await getDataWhereCondition(CoureUserView, id);
            return courseById;
        } catch (error) {
            throw error;
        }
    }

    async createCourseUser(data) {
        try {
            const newCourse = await insertData(Course_User, data);
            return newCourse;
        } catch (error) {
            throw error;
        }
    }


    async editCourseUser(id,data) {
        try {
            const newLesson = await editData(Course_User, id, data);
            return newLesson;
        } catch (error) {
            throw error;
        }
    }
}

