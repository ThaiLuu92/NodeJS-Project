import { Sequelize } from "sequelize";
import "dotenv/config";

const SQL_DATABASE = process.env.SQL_DATABASE;
const SQL_PASSWORD = process.env.SQL_PASSWORD;


const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  database: SQL_DATABASE,
  password: SQL_PASSWORD,

  
});

export default sequelize;

