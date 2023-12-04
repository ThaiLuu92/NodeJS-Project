import { Category } from "../models/category.model.js";


Category.sync() 
  .then(() => {
    const sampleData = [
      { name: 'JLPT', description: 'Mô tả JLPT', status: true },
      { name: 'Kaiwa', description: 'Mô tả Kaiwa', status: true },
      { name: 'Shiken', description: 'Mô tả Shiken', status: true },
      { name: 'Business', description: 'Mô tả Business', status: true },
    ];

    return Category.bulkCreate(sampleData);
  })
  .then((createdCategories) => {
    console.log("Created categories:", createdCategories.map(cat => cat.toJSON()));
  })
  .catch((error) => {
    console.error("Error creating categories:", error);
  });

  export default Category