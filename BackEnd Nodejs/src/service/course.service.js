import CourseRepository from "../repository/course.repository.js";

const courseRepository = new CourseRepository();

export default class CourseService {
  async getCourse() {
    try {
      const data = await courseRepository.getCourse();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedCourse() {
    try {
      const data = await courseRepository.getDeletedCourse();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCourseById(id) {
    try {
      const courseById = await courseRepository.getCourseById(id);
      return courseById;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedCourseById(id) {
    try {
      const courseById = await courseRepository.getDeletedCourseById(id);
      return courseById;
    } catch (error) {
      throw error;
    }
  }

  async createCourse(item) {
    try {
      const data = await courseRepository.createCourse(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllDeletedCourse() {
    try {
      const data = await courseRepository.deleteAllDeletedCourse();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCourse(id) {
    try {
      const data = await courseRepository.deleteCourse(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteCourse(id) {
    try {
      const data = await courseRepository.softDeleteCourse(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async restoreCourse(id) {
    try {
      const data = await courseRepository.restoreCourse(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editCourse(id, item) {
    try {
      const data = await courseRepository.editCourse(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async searchCourseByCondition(condition) {
    try {
      const courseByCondition = await courseRepository.searchCourseByCondition(condition);
      return courseByCondition;
    } catch (error) {
      throw error;
    }
  }

  async editCourseChangeStatus(id, item) {
    try {
      const data = await courseRepository.editCourse(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }

}
