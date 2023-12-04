import Payment from "../models/payment.mode.js";

Payment.sync()
  .then(() => {
    const sampleData = [
      {
        course_price: 990000,
        status: true,
        user_id: "9f72e58a-a21d-4190-869b-90e0b928d4a2",
        category_id: 2,
        courses_id: 4,
      },
      {
        course_price: 990000,
        status: true,
        user_id: "9f72e58a-a21d-4190-869b-90e0b928d4a2",
        category_id: 2,
        courses_id: 5,
      },
      {
        course_price: 1590000,
        status: true,
        user_id: "9f72e58a-a21d-4190-869b-90e0b928d4a2",
        category_id: 3,
        courses_id: 6,
      },
      {
        course_price: 1690000,
        status: true,
        user_id: "9f72e58a-a21d-4190-869b-90e0b928d4a2",
        category_id: 3,
        courses_id: 7,
      },
      {
        course_price: 1890000,
        status: true,
        user_id: "9f72e58a-a21d-4190-869b-90e0b928d4a2",
        category_id: 3,
        courses_id: 8,
      },
    ];

    return Payment.bulkCreate(sampleData);
  })
  .then((createdPayments) => {
    console.log(
      "Created categories:",
      createdPayments.map((cat) => cat.toJSON())
    );
  })
  .catch((error) => {
    console.error("Error creating categories:",4444444444444444, error,5555555555555);
  });

export default Payment;
