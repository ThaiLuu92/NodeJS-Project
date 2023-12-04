import express from "express";
import LessonUserController from "../controller/lesson_user.controller.js";
const lessonUserRouter = express.Router();
const lessonUserController = new LessonUserController();

// API Lesson User
lessonUserRouter.get("/view", lessonUserController.getLessonUserById);

lessonUserRouter.get("/", lessonUserController.getAllLessonUser);

lessonUserRouter.put("/:id",lessonUserController.editLessonUser);

export default lessonUserRouter;