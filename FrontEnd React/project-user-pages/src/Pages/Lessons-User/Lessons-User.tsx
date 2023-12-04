import React, { useEffect, useState } from "react";
import "./Lessons-User.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDataByCondition, getDataById, updateData } from "../../Apis/API";
import {
  COURSE,
  COURSE_USER,
  COURSE_VIEW,
  LESSON,
  LESSON_VIEW,
} from "../../Apis/common";
import { AuthState } from "../../Redux/Slice/AuthSlice";
import { useSelector } from "react-redux";
import { I_CourseView } from "../../Types/formData.type";

function LessonsUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userLogin = useSelector(
    (state: { auth: AuthState }) => state.auth.user
  );

  const [courses, setCourses] = useState<I_CourseView[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const indexToSelect = 0; // Đặt index bạn muốn lấy giá trị từ
  const selectedCourseId = courses[indexToSelect]?.id;
  useEffect(() => {
    const fetchMyCourse = async () => {
      const data = { user_id: userLogin?.id };
      if (userLogin) {
        const courseData = await getDataByCondition(COURSE_VIEW, data);
        // Kiểm tra xem courseData.data có tồn tại và không rỗng

        if (courseData.data && courseData.data.length > 0) {
          // Tìm kiếm course cụ thể dựa trên id
          const selectCourse = courseData.data.find(
            (course: I_CourseView) => course.id == id
          );

          // Kiểm tra xem selectCourse có tồn tại
          if (selectCourse) {
            setCourses([selectCourse]);
          } else {
            // Xử lý trường hợp không tìm thấy course
            console.error(`Không tìm thấy khóa học với id ${id}`);
          }
        } else {
          // Xử lý trường hợp không có dữ liệu
          console.error("Không có dữ liệu về khóa học");
        }
      }
    };

    fetchMyCourse();
  }, [userLogin, id]);

  useEffect(() => {
    const fetchLessonUser = async () => {
      const data = { courses_user_id: id };
      if (userLogin) {
        const lessonData = await getDataByCondition(LESSON_VIEW, data);
        setLessons(lessonData.data);
      }
    };
    fetchLessonUser();
  }, [userLogin, id]);

  const handleCompleteLesson = async () => {
    const updatedLessons = [...lessons];

    // Kiểm tra xem currentLessonIndex có vượt quá chiều dài của mảng không
    if (currentLessonIndex < updatedLessons.length) {
      updatedLessons[currentLessonIndex].status = "complete";
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
      setLessons(updatedLessons);

      const lessonId = updatedLessons[currentLessonIndex].id;
      try {
        await updateData(LESSON, lessonId, { status: "complete" });

        const nextLessonId = updatedLessons[currentLessonIndex + 1]?.id;
        if (nextLessonId) {
          // Nếu có bài học tiếp theo, cập nhật trạng thái 'processing'
          await updateData(LESSON, nextLessonId, { status: "processing" });
          const lessonData = await getDataByCondition(LESSON_VIEW, {
            courses_user_id: id,
          });
          setLessons(lessonData.data);
        } else {
          // Nếu không có bài học tiếp theo, tất cả bài học đã hoàn thành
          await updateData(COURSE_USER, selectedCourseId, { status: true });

          // Hiển thị thông báo khi hoàn thành khóa học
          alert("Chúc mừng! Bạn đã hoàn thành khóa học.");
          navigate("/User/MyCourse");
        }
      } catch (error) {
        console.error("Error updating lesson status:", error);
      }
    } else {
      // currentLessonIndex vượt quá chiều dài của mảng
      console.error("Error: currentLessonIndex out of bounds");
    }
  };

  const handleSelectLesson = (index: any) => {
    if (
      index <= currentLessonIndex ||
      lessons[index - 1]?.status === "complete"
    ) {
      setCurrentLessonIndex(index);
    } else {
      alert("Bạn cần hoàn thành bài học trước đó trước khi chọn bài học mới");
    }
  };
  const completionPercentage =
    (lessons.filter((lesson) => lesson.status === "complete").length /
      lessons.length) *
    100;
  const currentLesson = lessons[currentLessonIndex];
console.log(111111,currentLesson);

  return (
    <div>
      <div className="courses-menu">
        <div className="container courses-menu">
          <div className="courses-menu-price">
            {courses?.map((course) => (
              <div className="p-3" key={course.id} id="title-course-name">
                {course.courses_name}
              </div>
            ))}
          </div>
          <div className="courses-menu-button">
            <a href="/courses.html" className="p-4-courses-link">
              <p>Các khóa học khác</p>
            </a>
            <a href="#" className="p-4-courses-link">
              <p>Tổng quan khóa học</p>
            </a>
          </div>
        </div>
      </div>
      <div id="course-menu">
        <div className="lesson">
          <div className="lesson-title">
            <h3>{currentLesson?.lesson_name}</h3>
            {currentLesson?.status !== "complete" && (
              <button onClick={handleCompleteLesson}>Hoàn thành bài học</button>
            )}
          </div>

          {currentLesson && (
            <>
            <iframe
              key={currentLessonIndex}
              width={800}
              height={450}
              src={currentLesson.lesson_video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
        

          <h3>Bài kiểm tra</h3>
            
            <img
              key={currentLessonIndex}
              width={800}
              src={currentLesson.lessons_exercise}
            /></>
          )}
        </div>
        <div className="info-course">
          <div className="progress-container">
            <div className="total-circlebar">
              <h4>Tiến độ khóa học</h4>
              <div className="percentage">
                <h4 id="completion-percentage">{`${completionPercentage}%`}</h4>
              </div>
            </div>
            <div className="stage-bar">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={`/User/MyCourse/${id}/${index + 1}`}
                  className={`lesson-title-name ${
                    lesson.status === "complete" ? "complete-color" : ""
                  } ${
                    lesson.status === "processing" ? "processing-color" : ""
                  } ${
                    lesson.status === "uncompleted" ? "uncompleted-color" : ""
                  } ${currentLessonIndex === index ? "selected-lesson" : ""}`}
                  onClick={() => handleSelectLesson(index)}
                >
                  <span>{lesson.lesson_name}</span>
                  <span>
                    {lesson.status === "complete"
                      ? "Đã hoàn thành"
                      : lesson.status === "processing"
                      ? "Đang học"
                      : "Chưa học"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonsUser;
