import CourseUserRepository from "../repository/course_user.repository.js";

const courseUserRepository = new CourseUserRepository();

export default class CourseUserService {
    async getCourseUser() {
        try {
          const data = await courseUserRepository.getCourseUser();
          return data;
        } catch (error) {
          throw error;
        }
      }

      async getCourseUserById(id) {
        try {
          const data = await courseUserRepository.getCourseUserById(id);
          return data;
        } catch (error) {
          throw error;
        }
      }

      async createCourseUser(item) {
        try {
          const data = await courseUserRepository.createCourseUser(item);
          return data;
        } catch (error) {
          throw error;
        }
      }

      async editCourseUser(id, item) {
        try {
          const data = await courseUserRepository.editCourseUser(id, item);
          return data;
        } catch (error) {
          throw error;
        }
      }

      
    


}