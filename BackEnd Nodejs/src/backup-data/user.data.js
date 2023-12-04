import User from '../models/user.model.js';

User.sync()
  .then(() => {
    const usersData = [];

    for (let i = 1; i <= 10; i++) {
      usersData.push({
        email: `user${i}@gmail.com`,
        user_name: `User ${i}`,
        password: `password${i}`,
        role: 0, 
        status: true,
        dob: new Date(1990, 11, i + 1), // Ví dụ: ngày sinh tăng dần từ 1 đến 10
        address: `Address ${i}`,
        phone: '',
        level: '',
        avatar: '',
      });
    }

    return User.bulkCreate(usersData);
  })
  .then((createdUsers) => {
    console.log("Created users:", createdUsers.map(user => user.toJSON()));
  })
  .catch((error) => {
    console.error("Error creating users:", error);
  });

  export default User
