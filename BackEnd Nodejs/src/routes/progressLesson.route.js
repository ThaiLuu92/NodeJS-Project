import express, { query } from "express";
import fs from "fs";
import ProgressLessonController from "../controller/progressLesson.controller.js";

const progressLessonController = new ProgressLessonController();
const progressLessonRouter = express.Router();

progressLessonRouter.get("/", progressLessonController.getProgressLessonData);

export default progressLessonRouter;
