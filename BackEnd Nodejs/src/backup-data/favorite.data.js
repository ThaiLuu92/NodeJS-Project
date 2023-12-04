import Favorite from "../models/favorite.model.js";

Favorite.sync()
  .then(() => {
    const sampleData = [
        {
          user_id: "6c626a2f-dc00-49d5-9e9a-18dba6841b36",
          courses_id: 1,
        },
        {
          user_id: "6c626a2f-dc00-49d5-9e9a-18dba6841b36",
          courses_id: 2,
        },
        {
          user_id: "6c626a2f-dc00-49d5-9e9a-18dba6841b36",
          courses_id: 3,
        },
        {
          user_id: "6c626a2f-dc00-49d5-9e9a-18dba6841b36",
          courses_id: 4,
        },
        {
          user_id: "7b3c4b33-342c-49c9-b29c-6a84b73ea659",
          courses_id: 5,
        },
        {
          user_id: "7b3c4b33-342c-49c9-b29c-6a84b73ea659",
          courses_id: 6,
        },
        {
          user_id: "7b3c4b33-342c-49c9-b29c-6a84b73ea659",
          courses_id: 7,
        },
        {
          user_id: "7b3c4b33-342c-49c9-b29c-6a84b73ea659",
          courses_id: 8,
        },
        {
          user_id: "7b3c4b33-342c-49c9-b29c-6a84b73ea659",
          courses_id: 9,
        },
    ];

    return Favorite.bulkCreate(sampleData);
  })
  .then((createdFavorites) => {
    console.log(
      "Created Favorites:",
      createdFavorites.map((favorite) => favorite.toJSON())
    );
  })
  .catch((error) => {
    console.error("Error creating favorites:", error);
  });

export default Favorite;