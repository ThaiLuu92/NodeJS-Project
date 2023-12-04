import {   getData,
  insertData,
  deleteData,
  editData,
  getDataById,
  sortDeleteData,
  restoreData,
  getDeletedData,
  getDeletedDataById,
  getDataByCondition,
  getDataWhereCondition,
  insertMultipleData,
  deleteAllDataByCondition} from "../../utils/data.util.js";
import Lesson from "../models/lesson.model.js";

export default class LessonRepository {
  async getLesson() {
    try {
      const lessonData = await getData(Lesson);
      return lessonData;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedLesson() {
    try {
      const lessonData = await getDeletedData(Lesson);
      return lessonData;
    } catch (error) {
      throw error;
    }
  }

  async getLessonById(id) {
    try {
      const lessonById = await getDataById(Lesson, id);
      return lessonById;
    } catch (error) {
      throw error;
    }
  }

  async getLessonByCoureId(condition) {
    try {
      const lessonById = await getDataWhereCondition(Lesson, condition);
      return lessonById;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedLessonById(id) {
    try {
      const lessonById = await getDeletedDataById(Lesson, id);
      return lessonById;
    } catch (error) {
      throw error;
    }
  }

  async createLesson(data) {
    console.log(222222222222, data);
    try {
      const newLesson = await insertData(Lesson, data);
      return newLesson;
    } catch (error) {
      console.log(333333333333, error);
      throw error;
    }
  }

  async deleteAllDeletedLesson() {
    try {
      const deleteLesson = await deleteAllDataByCondition(Lesson);
      return deleteLesson;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteLesson(id) {
    try {
      const softDeleteLesson = await sortDeleteData(Lesson, id);
      return softDeleteLesson;
    } catch (error) {
      throw error;
    }
  }

  async restoreLesson(id) {
    try {
      const restoreLesson = await restoreData(Lesson, id);
      return restoreLesson;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteLesson(id) {
    try {
      const deleteLesson = await deleteData(Lesson, id);
      return deleteLesson;
    } catch (error) {
      throw error;
    }
  }

  async editLesson(id, item) {
   try {
    const editLesson = await editData(Lesson, id, item);
    return editLesson;
   } catch (error) {
    throw error;
   }
  }

  async searchLessonByCondition(condition) {
    try {
      const searchLessonByCondition = await getDataByCondition(Lesson, condition);
      return searchLessonByCondition;
    } catch (error) {
      throw error;
    }
  }
}
