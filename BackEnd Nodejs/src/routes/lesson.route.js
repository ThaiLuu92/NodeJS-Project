import express from "express";
import LessonController from "../controller/lesson.controller.js";
import {  createUploadHandlerAny } from "../middlewares/handleUpload.js";
const lessonRouter = express.Router();
const lessonController = new LessonController()

// API Lessons
lessonRouter.get("/search", lessonController.searchLessonByCondition); 

lessonRouter.get("/trash", lessonController.getAllDeletedLesson);

lessonRouter.get("/trash/:id", lessonController.getDeletedLessonById);

lessonRouter.get("/", lessonController.getAllLesson);

lessonRouter.get("/:id", lessonController.getLessonById);

lessonRouter.delete("/delele-all", lessonController.deleteAllDeletedLesson);

lessonRouter.delete("/del-forever/:id", lessonController.deleteLesson);

lessonRouter.delete("/:id", lessonController.softDeleteLesson);

lessonRouter.put("/restore/:id", lessonController.restoreLesson);

lessonRouter.put("/:id", createUploadHandlerAny,lessonController.editLesson);

lessonRouter.post("/", createUploadHandlerAny,lessonController.createLesson);

lessonRouter.patch(
    "/:id",
    lessonController.editLessonChangeStatus
  );

export default lessonRouter;
