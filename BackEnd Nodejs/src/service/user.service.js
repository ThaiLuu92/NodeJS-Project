import { deleteCloudinary } from "../configs/cloudinary.config.js";
import UserRepository from "../repository/user.repository.js";

const userRepository = new UserRepository();
export default class UserService {
  async getUser() {
    try {
      const data = await userRepository.getUsers();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const userById = await userRepository.getUserById(id);
      return userById;
    } catch (error) {
      throw error;
    }
  }

  async editUser(id, item) {
    try {
      const data = await userRepository.editUser(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editUserChangeStatus(id, item) {
    try {
      const data = await userRepository.editUser(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editUserChangeAvatar(id, cloudinaryResult) {
    try {
      const data = await userRepository.editUser(id, cloudinaryResult);
      if (!data) {
        throw new Error("Failed to edit user.");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async searchUserByCondition(condition) {
    try {
      const userByCondition = await userRepository.searchUserByCondition(condition);
      return userByCondition;
    } catch (error) {
      throw error;
    }
  }
}
