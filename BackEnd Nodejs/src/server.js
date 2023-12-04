
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json" assert { type: "json" };
import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { route } from "./routes/index.js";
import handleError from "./middlewares/handleErorr.js";
import sequelize from "./configs/sequelize.config.js";
import cors from "cors"


// BACK UP DATA
// import CategoryData from './backup-data/category.data.js'
// import CourseData from './backup-data/course.data.js'
// import LessonData from './backup-data/lesson.data.js'
// import UserData from './backup-data/user.data.js'
// import PaymentData from './backup-data/payment.data.js'
// import Favorite from './backup-data/favorite.data.js'



const app = express();
app.use(cors({
  exposedHeaders: ["Authorization", "authorization"]
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



route(app);
app.use(handleError);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//Cập nhập cột cho bảng trong MYSQL
// (async () => {
//   await sequelize.sync({alert:true}); 
//   ;
// })();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connecting to http://localhost:${PORT}`);
});
