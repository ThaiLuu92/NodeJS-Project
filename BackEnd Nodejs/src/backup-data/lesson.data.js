import Lesson from "../models/lesson.model.js";


Lesson.sync()
  .then(() => {
    const lessonsData = [];

    for (let i = 1; i <= 10; i++) {
      lessonsData.push({
        name: `Bài ${i}`,
        status: true,
        exercise: `Bài tập ${i}`,
        lesson_img: `https://image${i}.jpg`,
        video: `https://video${i}.com`,
        courses_id: 2, 
      });
    }

    return Lesson.bulkCreate(lessonsData);
  })
  .then((createdLessons) => {
    console.log("Created lessons:", createdLessons.map(lesson => lesson.toJSON()));
  })
  .catch((error) => {
    console.error("Error creating lessons:", error);
  });

  export default Lesson
