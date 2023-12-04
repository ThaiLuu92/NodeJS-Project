import express from "express";
import CourseController from "../controller/course.controller.js";
import { createUploadHandlerAny, handleCourseImgUpload } from "../middlewares/handleUpload.js";

const couresRouter = express.Router();
const courseController = new CourseController()

// API Courses

couresRouter.get("/search", courseController.searchCourseByCondition);

couresRouter.get("/trash", courseController.getAllDeletedCourse);

couresRouter.get("/trash/:id", courseController.getDeletedCourseById);

couresRouter.get("/", courseController.getAllCourse);

couresRouter.get("/:id", courseController.getCourseById);

couresRouter.delete("/delele-all", courseController.deleteAllDeletedCourse);

couresRouter.delete("/del-forever/:id", courseController.deleteCourse);

couresRouter.delete("/:id", courseController.softDeleteCourse);

couresRouter.put("/restore/:id", courseController.restoreCourse);

couresRouter.put("/:id", createUploadHandlerAny, courseController.editCourse);

couresRouter.post("/",createUploadHandlerAny ,courseController.createCourse);

couresRouter.patch(
    "/:id",
    courseController.editCourseChangeStatus
  );

export default couresRouter;
