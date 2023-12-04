import express from "express";
import CourseUserController from "../controller/course_user.controller.js";
const courseUserController = new CourseUserController()
const couresUserRouter = express.Router();

// API Course User 
couresUserRouter.get("/view",courseUserController.getCourseUserById)


couresUserRouter.get("/", courseUserController.getAllCourseUser)


couresUserRouter.post("/:id",courseUserController.createCourseUser)

couresUserRouter.put("/:id",courseUserController.editCourseUser)


export default couresUserRouter;