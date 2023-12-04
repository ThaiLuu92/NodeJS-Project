import { MSG_COMMON } from "../messages/index.js";
import LessonService from "../service/lesson.service.js";

const lessonService = new LessonService();

class LessonController {
  async getAllLesson(req, res, next) {
    try {
      const ret = await lessonService.getLesson();
      res.status(200).json(ret);
    } catch (error) {
      next(error);
    }
  }

  async getAllDeletedLesson(req, res, next) {
    try {
      const ret = await lessonService.getDeletedLesson();
      if (ret) {
        res.status(200).json(ret);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Lesson") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getLessonById(req, res, next) {
    try {
      const lessonId = req.params.id;
      const lessonData = await lessonService.getLessonById(lessonId);
      if (lessonData) {
        res.status(200).json(lessonData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async getDeletedLessonById(req, res, next) {
    try {
      const lessonId = req.params.id;
      const lessonData = await lessonService.getDeletedLessonById(lessonId);
      if (lessonData) {
        res.status(200).json(lessonData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Lesson") });
      }
    } catch (error) {
      next(error);
    }
  }

  async createLesson(req, res, next) {
    console.log(1234, req.body);
    const lessonData = req.body;
    const createLesson = {...lessonData}
    try {
      const ret = await lessonService.createLesson(createLesson);
      res
        .status(201)
        .json({ message: MSG_COMMON.MSG_SUCCESS.create("Lesson"),ret });
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(req, res, next) {
    try {
      const lessonId = req.params.id;
      const deletedLesson = await lessonService.deleteLesson(lessonId);
      if (deletedLesson) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("Lesson") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteAllDeletedLesson(req, res, next) {
    try {
      const deletedLesson = await lessonService.deleteAllDeletedLesson();
      if (deletedLesson) {
        res
          .status(200) 
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("All Lesson") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.delete("All Lesson") });
      }
    } catch (error) {
      next(error);
    }
  }

  async softDeleteLesson(req, res, next) {
    try {
      const lessonId = req.params.id;
      const deletedLesson = await lessonService.softDeleteLesson(lessonId);
      if (deletedLesson) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.softDelete("Lesson") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.softDelete("Lesson") });
      }
    } catch (error) {
      next(error);
    }
  }

  async restoreLesson (req, res, next) {
    try {
      const lessonId = req.params.id;
      const restoreLesson = await lessonService.restoreLesson(lessonId);
      if (restoreLesson) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.restore(`Lesson with ID: ${lessonId} `)});
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.restore(`Lesson with ID: ${lessonId} `) });
      }
    } catch (error) {
      next(error);
    }
   }

  async editLesson(req, res, next) {
    const lessonId = req.params.id;
    const updatedData = req.body;
    try {
      const ret = await lessonService.editLesson(lessonId, updatedData);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("Lesson"),ret });
    } catch (error) {
      next(error);
    }
  }

  async searchLessonByCondition(req, res, next) {
    try {
      const query = req.query ;
      const condition = {
        key: Object.keys(query)[0], value: Object.values(query)[0]
      }
      const lessonData = await lessonService.searchLessonByCondition(condition);
      if (lessonData) {
        res.status(200).json(lessonData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async editLessonChangeStatus(req, res, next) {
    const id = req.params.id;
    const status = req.body;
    try {
      const ret = await lessonService.editLessonChangeStatus(id, status);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("Lesson") });
    } catch (error) {
      next(error);
    }
  };
}
export default LessonController;
