import { MSG_COMMON } from "../messages/index.js";
import LessonUserService from "../service/lesson_user.service.js";

const lessonUserService = new LessonUserService();

export default class LessonUserController {
    async getAllLessonUser(req, res, next) {
        try {
          const ret = await lessonUserService.getLessonUser();
          res.status(200).json(ret);
        } catch (error) {
          next(error);
        }
      }  

      async getLessonUserById(req, res, next) {
        try {
          const lessonId = req.query;
          const lessonData = await lessonUserService.getLessonUserById(lessonId);
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


      async editLessonUser(req, res, next) {
        const lessonId = req.params.id;
        const updatedData = req.body;
        try {
          const ret = await lessonUserService.editLessonUser(lessonId, updatedData);
          res
            .status(200)
            .json({ message: MSG_COMMON.MSG_SUCCESS.update("Lesson User"),ret });
        } catch (error) {
          next(error);
        }
      }
}