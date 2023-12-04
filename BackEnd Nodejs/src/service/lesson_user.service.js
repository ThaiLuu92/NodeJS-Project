import LessonUserRepository from "../repository/lesson_user.repository.js";

const lessonUserRepository = new LessonUserRepository();

export default class LessonUserService {
    async getLessonUser() {
        try {
          const data = await lessonUserRepository.getLessonUser();
          return data;
        } catch (error) {
          throw error;
        }
      }

      async getLessonUserById(id) {
        try {
          const lessonById = await lessonUserRepository.getLessonUserById(id);
          return lessonById;
        } catch (error) {
          throw error;
        }
      }

      async editLessonUser(id, item) {
        try {
          const data = await lessonUserRepository.editLessonUser(id, item);
          return data;
        } catch (error) {
          throw error;
        }
      }
}