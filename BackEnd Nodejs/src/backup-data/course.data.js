import Course from "../models/course.model.js";

Course.sync()
  .then(() => {
    const sampleData = [
      {
        name: "Học Online N5",
        description: "Mô tả Học Online N5",
        level: "N5",
        price: 990000,
        duration: 6,
        status: true,
        category_id: 1,
      },
      {
        name: "Học Online N4",
        description: "Mô tả Học Online N4",
        level: "N4",
        price: 1290000,
        duration: 6,
        status: true,
        category_id: 1,
      },
      {
        name: "Học Online N3",
        description: "Mô tả Học Online N3",
        level: "N3",
        price: 1590000,
        duration: 6,
        status: true,
        category_id: 1,
      },
      {
        name: "Học Giao Tiếp Sơ Cấp",
        description: "Mô tả Học Giao Tiếp Sơ Cấp",
        level: "Sơ Cấp",
        price: 1690000,
        duration: 6,
        status: true,
        category_id: 2,
      },
      {
        name: "Học Giao Tiếp Trung Cấp",
        description: "Mô tả Học Giao Tiếp Trung Cấp",
        level: "Trung Cấp",
        price: 1890000,
        duration: 6,
        status: true,
        category_id: 2,
      },
      {
        name: "Luyện đề N5",
        description: "Mô tả Luyện đề N5",
        level: "N5",
        price: 500000,
        duration: 2,
        status: true,
        category_id: 3,
      },
      {
        name: "Luyện đề N4",
        description: "Mô tả Luyện đề N4",
        level: "N4",
        price: 500000,
        duration: 2,
        status: true,
        category_id: 3,
      },
      {
        name: "Luyện đề N3",
        description: "Mô tả Luyện đề N3",
        level: "N3",
        price: 500000,
        duration: 2,
        status: true,
        category_id: 3,
      },
      {
        name: "Tiếng Nhật Doanh Nghiệp Sơ Cấp",
        description: "Mô tả Tiếng Nhật Doanh Nghiệp Sơ Cấp",
        level: "Sơ Cấp",
        price: 1690000,
        duration: 6,
        status: true,
        category_id: 4,
      },
      {
        name: "Tiếng Nhật Doanh Nghiệp Trung Cấp",
        description: "Mô tả Tiếng Nhật Doanh Nghiệp Trung Cấp",
        level: "Trung Cấp",
        price: 1890000,
        duration: 6,
        status: true,
        category_id: 4,
      },
      
    ];

    return Course.bulkCreate(sampleData);
  })
  .then((createdCategories) => {
    console.log(
      "Created categories:",
      createdCategories.map((cat) => cat.toJSON())
    );
  })
  .catch((error) => {
    console.error("Error creating categories:", error);
  });

export default Course;
