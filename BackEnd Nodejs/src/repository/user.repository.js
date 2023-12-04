import {
  getData,
  editData,
  getDataById,
  getDataByCondition
} from "../../utils/data.util.js";
import User from "../models/user.model.js";

export default class UserRepository {
  async getUsers() {
    try {
      const userData = await getData(User);
      return userData;
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
      console.error(error);
      throw error;
    }
  }

  async editUser(id, item) {
    try {
     const editUser = await editData(User, id, item);
     return editUser;
    } catch (error) {
     throw error;
    }
   }
   async searchUserByCondition(condition) {
    try {
      const searchUserByCondition = await getDataByCondition(User, condition);
      return searchUserByCondition;
    } catch (error) {
      throw error;
    }
  }

   
}
