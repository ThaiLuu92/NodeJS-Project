import { MSG_COMMON } from "../messages/index.js";
import CourseService from "../service/course.service.js";

const courseService = new CourseService();

class CourseController {
  async getAllCourse(req, res, next) {
    try {
      const ret = await courseService.getCourse();
      if (ret) {
        res.status(200).json(ret);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllDeletedCourse(req, res, next) {
    try {
      const ret = await courseService.getDeletedCourse();
      if (ret) {
        res.status(200).json(ret);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const courseId = req.params.id;
      const courseData = await courseService.getCourseById(courseId);
      if (courseData) {
        res.status(200).json(courseData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getDeletedCourseById(req, res, next) {
    try {
      const courseId = req.params.id;
      const courseData = await courseService.getDeletedCourseById(courseId);
      if (courseData) {
        res.status(200).json(courseData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async createCourse(req, res, next) {
    const courseData = req.body;
    const updatedCourseData = {
      ...courseData,
    };

    try {
      const ret = await courseService.createCourse(updatedCourseData);
      if (ret) {
        res
          .status(201)
          .json({ message: MSG_COMMON.MSG_SUCCESS.create("Course") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.create("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteAllDeletedCourse(req, res, next) {
    try {
      const deletedCourse = await courseService.deleteAllDeletedCourse();
      if (deletedCourse) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("All Course") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.delete("All Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const deletedCourse = await courseService.deleteCourse(courseId);
      if (deletedCourse) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("Course") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.delete("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async softDeleteCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const deletedCourse = await courseService.softDeleteCourse(courseId);
      if (deletedCourse) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.softDelete("Course") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.softDelete("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async restoreCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const restoreCourse = await courseService.restoreCourse(courseId);
      if (restoreCourse) {
        res
          .status(200)
          .json({
            message: MSG_COMMON.MSG_SUCCESS.restore(
              `Course with ID: ${courseId} `
            ),
          });
      } else {
        res
          .status(404)
          .json({
            message: MSG_COMMON.MSG_FAILURE.restore(
              `Course with ID: ${courseId} `
            ),
          });
      }
    } catch (error) {
      next(error);
    }
  }

  async editCourse(req, res, next) {
    const courseId = req.params.id;
    const updatedData = req.body;
    try {
      const ret = await courseService.editCourse(courseId, updatedData);
      if (ret) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.update("Course") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.update("Course") });
      }
    } catch (error) {
      next(error);
    }
  }

  async searchCourseByCondition(req, res, next) {
    try {
      const query = req.query;
      const condition = {
        key: Object.keys(query)[0],
        value: Object.values(query)[0],
      };
      const courseData = await courseService.searchCourseByCondition(condition);
      if (courseData) {
        res.status(200).json(courseData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async editCourseChangeStatus(req, res, next) {
    const id = req.params.id;
    const status = req.body;
    try {
      const ret = await courseService.editCourseChangeStatus(id, status);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("Course") });
    } catch (error) {
      next(error);
    }
  }
}

export default CourseController;
