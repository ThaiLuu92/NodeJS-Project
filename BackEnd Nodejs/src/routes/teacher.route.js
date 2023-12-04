import express from "express";
import TeacherController from "../controller/teacher.controller.js";
const teacherRouter = express.Router();
const teacherController = new TeacherController();
// API Courses

teacherRouter.get("/", teacherController.getAllDataTeacher);

teacherRouter.post("/", teacherController.createTeacher);

teacherRouter.delete("/:id", teacherController.deleteTeacher);

teacherRouter.put("/:id", teacherController.editTeacher);

export default teacherRouter;
