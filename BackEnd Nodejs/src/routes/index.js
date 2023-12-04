import authRouter from "./auth.route.js";
import categoryRouter from "./category.route.js";
import couresRouter from "./course.route.js";
import couresUserRouter from "./course_user.route.js";
import favoritesRouter from "./favorite.route.js";
import lessonRouter from "./lesson.route.js";
import lessonUserRouter from "./lesson_user.route.js";
import paymentRouter from "./payment.route.js";
import progressLessonRouter from "./progressLesson.route.js";
import teacherRouter from "./teacher.route.js";
import userRouter from "./user.route.js";


export function route(app) {
  // 1 API Router Category OK
  app.use("/api/v1/category", categoryRouter);

  // 2 API Courses OK
  app.use("/api/v1/course", couresRouter);

  // 3 API Lessons OK
  app.use("/api/v1/lesson", lessonRouter);

  // 4 API Auth OK
  app.use("/api/v1/auth", authRouter);

  // 5 API Users OK
  app.use("/api/v1/users", userRouter);

  // 6 API Payment OK
  app.use("/api/v1/payment", paymentRouter);

  // 7 API Favorite OK
  app.use("/api/v1/favorites", favoritesRouter);

  // 8 API Course User
  app.use("/api/v1/course-user", couresUserRouter);

  // 9 API Lesson User
  app.use("/api/v1/lesson-user", lessonUserRouter);

  // API Teacher
  app.use("/api/v1/teachers", teacherRouter);

  // API Progress Lesson
  app.use("/api/v1/progressLesson", progressLessonRouter);
}
