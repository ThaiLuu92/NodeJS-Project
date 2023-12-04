import React, { useState, useEffect, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { I_Course, I_Lesson } from "../../types/form.type";
import Button from "@mui/material/Button";
import { Modal, Paper, Typography } from "@mui/material";
import { createData, createDataWithImage, updateData, updateDataWithImage } from "../../apis/API";

interface CoursesModalProps {
  lesson: I_Lesson | null;
  courses: I_Course[] | null;
  open: boolean;
  onClose: () => void;
  action: string;
  fetchLessons: Function;
}

const LessonModal: React.FC<CoursesModalProps> = ({
  lesson,
  courses,
  open,
  onClose,
  action,
  fetchLessons,
}) => {
  const [formData, setFormData] = useState<I_Lesson>({
    id: "",
    name: "",
    status: true,
    lesson_img: "",
    video: "",
    exercise: "",
    courses_id: "",
  });
  const handleAddCourse = async () => {
    await createDataWithImage("lesson", formData);
    fetchLessons();
    onClose();
  };


  const courseOptions = courses?.map((course) => ({
    name: course.name,
    id: course.id,
  }));

  const handleUpdateCourse = async () => {
    await updateDataWithImage("lesson", formData.id, formData);
    fetchLessons();
    onClose();
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const { name, value , files} = event.target;
    if (files && files.length > 0 ) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    name: string
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (lesson) {
      setFormData(lesson);
    } else {
      setFormData({
        id: "",
        name: "",
        status: true,
        lesson_img: "",
        video: "",
        exercise: "",
        courses_id: "",
      });
    }
  }, [lesson]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thông tin bài học
        </Typography>

        <Paper
          sx={{ p: 2, maxWidth: "800px", maxHeight: "600px", overflow: "auto" }}
        >
          <FormControl style={{ margin: "8px", minWidth: "120px", width: "95%" }}>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="name">Tên bài học</label>
              <TextField
              size="small"
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="courses_id">Danh mục</label>
              <Select
                size="small"
                id="courses_id"
                name="courses_id"
                value={formData.courses_id}
                onChange={(event: SelectChangeEvent<string>) =>
                  handleSelectChange(event, "courses_id")
                }
                style={{ width: "100%" }}
              >
                {courseOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="lesson_img">Hình Ảnh</label>
              <input
                type="file"
                id="lesson_img"
                name="lesson_img"
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16, marginBottom: 5 }}
              />
              {formData.lesson_img && (
                <img
                src={typeof formData.lesson_img === 'string' ? formData.lesson_img : URL.createObjectURL(formData.lesson_img)}
                  alt="lessonImage"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="video">Video</label>
              <TextField
              size="small"
                type="text"
                id="video"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16 }}
              />
            </div>
            <div style={{ marginBottom: 5 }}>
              <label htmlFor="exercise">Bài tập</label>
              <input
                type="file"
                id="exercise"
                name="exercise"
                onChange={handleInputChange}
                style={{ width: "100%", fontSize: 16, marginBottom: 5 }}
              />
              {formData.exercise && (
                <img
                src={typeof formData.exercise === 'string' ? formData.exercise : URL.createObjectURL(formData.exercise)}
                  alt="exerciseImage"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
          </FormControl>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginRight: 20 }}
          onClick={onClose}
        >
          Đóng
        </Button>
        {action !== "view" ? (
          action === "add" ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleAddCourse}
            >
              Thêm
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleUpdateCourse}
            >
              Sửa
            </Button>
          )
        ) : null}
      </Box>
    </Modal>
  );
};

export default LessonModal;
