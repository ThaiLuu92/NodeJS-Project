import LessonRepository from "../repository/lesson.repositpry.js";

const lessonRepository = new LessonRepository();

export default class LessonService {
  async getLesson() {
    try {
      const data = await lessonRepository.getLesson();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedLesson() {
    try {
      const data = await lessonRepository.getDeletedLesson();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getLessonById(id) {
    try {
      const lessonById = await lessonRepository.getLessonById(id);
      return lessonById;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedLessonById(id) {
    try {
      const lessonById = await lessonRepository.getDeletedLessonById(id);
      return lessonById;
    } catch (error) {
      throw error;
    }
  }

  async createLesson(item) {
    try {
      const data = await lessonRepository.createLesson(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteLesson(id) {
    try {
      const data = await lessonRepository.deleteLesson(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllDeletedLesson() {
    try {
      const data = await lessonRepository.deleteAllDeletedLesson();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteLesson(id) {
    try {
      const data = await lessonRepository.softDeleteLesson(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async restoreLesson(id) {
    try {
      const data = await lessonRepository.restoreLesson(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editLesson(id, item) {
    try {
      const data = await lessonRepository.editLesson(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async searchLessonByCondition(condition) {
    try {
      const lessonByCondition = await lessonRepository.searchLessonByCondition(condition);
      return lessonByCondition;
    } catch (error) {
      throw error;
    }
  }

  async editLessonChangeStatus(id, item) {
    try {
      const data = await lessonRepository.editLesson(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }


}
