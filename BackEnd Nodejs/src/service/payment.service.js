import PaymentRepository from "../repository/payment.repository.js";
import { AuthencationException } from "../expeiptions/index.js";
import CourseUserRepository from "../repository/course_user.repository.js";
import LessonRepository from "../repository/lesson.repositpry.js";
import LessonUserRepository from "../repository/lesson_user.repository.js";
import { sendPayment } from "../../utils/auth.util.js";
const paymentRepository = new PaymentRepository();
const courseUserRepository = new CourseUserRepository();
const lessonRepository = new LessonRepository();
const lessonUserRepository = new LessonUserRepository();
export default class PaymentService {
  async getPayment() {
    try {
      const data = await paymentRepository.getPayment();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentById(id) {
    try {
      const paymentById = await paymentRepository.getPaymentById(id);
      return paymentById;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentWhereCondition(condition) {
    try {
      const data = await paymentRepository.getDataWherePaymentView(condition);
      return data;
    } catch (error) {
      throw error;
    }
  }


  async createPayment(paymenData) {
    console.log(111111, paymenData);
    try {
      const conditions = {
        user_id: paymenData.user_id,
        courses_id: paymenData.courses_id,
      };

      // Kiểm tra xem người dùng đã mua khóa học chưa
      const paymentCheck = await paymentRepository.getDataWhereCondition(conditions);

      if (paymentCheck.length > 0) {
        throw new AuthencationException(undefined, undefined, {
          msgCheck: "Khóa học này bạn đã mua rồi",
        });
      }

      // Tạo thanh toán mới
      const addPayment = {
        user_id: paymenData.user_id,
        courses_id: paymenData.courses_id,
        category_id: paymenData.category_id,
        course_price: paymenData.course_price,
      };

      const createPayment = await paymentRepository.createPayment(addPayment);

      if (!createPayment) {
        throw new AuthencationException(undefined, undefined, {
          msgCheck: "Không thể tạo thanh toán",
        });
      }

      // Tạo liên kết giữa người dùng và khóa học
      const addCourseUser = {
        user_id: paymenData.user_id,
        courses_id: paymenData.courses_id,
        courses_name: paymenData.course_name,
      };

      const createCourseUser = await courseUserRepository.createCourseUser(addCourseUser);

      if (!createCourseUser) {
        throw new AuthencationException(undefined, undefined, {
          msgCheck: "Không thể tạo liên kết người dùng và khóa học",
        });
      }
      const lessons = await lessonRepository.getLessonByCoureId({
        courses_id: paymenData.courses_id,
      });


      // Hàm map thay thế hàm for
      // const lessonUserDatas = lessons.map((lesson) => ({
      //   courses_user_id: createCourseUser.dataValues.id,
      //   lesson_id: lesson.id,
      //   status: "uncompleted",
      // }));

      // const createLessonUsers = await Promise.all(
      //   lessonUserDatas.map((lessonUserData) =>
      //     lessonUserRepository.createLessonUser(lessonUserData)
      //   )
      // );

      for (const lesson of lessons) {
        const lessonUserData = {
          courses_user_id: createCourseUser.dataValues.id,
          courses_name: createCourseUser.dataValues.courses_name,
          lesson_id: lesson.id,
          lesson_name: lesson.name,
          status: "uncompleted",
          lessons_exercise: lesson.exercise,
          lesson_img: lesson.lesson_img,
          lesson_video: lesson.video
        }

        const createLessonUser = await lessonUserRepository.createLessonUser(lessonUserData);

        if (!createLessonUser) {
          throw new AuthencationException(undefined, undefined, {
            msgCheck: "Không thể tạo bản ghi lesson_user",
          });
        }

      };


      sendPayment(paymenData.user_email, paymenData.course_name)
      return createCourseUser;
    } catch (error) {
      throw error;
    }
  }


  async deletePayment(id) {
    try {
      const data = await paymentRepository.deletePayment(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editPayment(id, item) {
    try {
      const data = await paymentRepository.editPayment(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
