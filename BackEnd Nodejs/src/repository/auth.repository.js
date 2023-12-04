import { getData, insertData, getDataByEmail, getDataById, editData} from "../../utils/data.util.js";
import User from "../models/user.model.js";

export default class AuthRepository {
  
  async getUsers() {
    try {
      const userData = await getData(User);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const newUser = await insertData(User, userData);
      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const userData = await getDataById(User, id);
      return userData;
    } catch (error) {
      console.error("AuthRepository",error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const userData = await getDataByEmail(User, email);
      return userData;
    } catch (error) {
      console.error("AuthRepository",error);
      throw error;
    }
  }
 
}
