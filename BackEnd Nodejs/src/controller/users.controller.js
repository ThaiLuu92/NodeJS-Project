import { MSG_COMMON } from "../messages/index.js";
import UserService from "../service/user.service.js";
const userService = new UserService()
class UserController {

  async getDataUser(req, res, next) {
    try {
      const ret = await userService.getUser();
      res.status(200).json(ret);
    } catch (error) {
      next(error);
    }
  };

  async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const userData = await userService.getUserById(userId);
      if (userData) {
        res.status(200).json(userData);
      } else {
        res
        .status(404)
        .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  };
  async editUser(req, res, next) {
    const userId = req.params.id;
    const data = req.body;
    try {
      const ret = await userService.editUser(userId, data);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("User") });
    } catch (error) {
      next(error);
    }
  };

  async editUserChangeStatus(req, res, next) {
    const userId = req.params.id;
    const status = req.body;
    try {
      const ret = await userService.editUserChangeStatus(userId, status);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("User") });
    } catch (error) {
      next(error);
    }
  };

  async changeAvatar(req, res, next){
    try {
      const userId = req.params.id;
      const cloudinaryResult = req.body;
      const ret = await userService.editUserChangeAvatar(userId, cloudinaryResult);
      res.status(200).json(ret);
    } catch (error) {
      next(error);
    }
  };

  async searchUserByCondition(req, res, next) {
    try {
      const query = req.query ;
      const condition = {
        key: Object.keys(query)[0], value: Object.values(query)[0]
      }
      const userData = await userService.searchUserByCondition(condition);
      if (userData) {
        res.status(200).json(userData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
