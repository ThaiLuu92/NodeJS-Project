import { MSG_COMMON } from "../messages/index.js";
import FavoriteService from "../service/favorite.service.js";
const favoriteService = new FavoriteService();

export default class FavoriteController {
  async getAllFavorite(req, res, next) {
    try {
      const ret = await favoriteService.getFavorite();
      res.status(200).json({message: MSG_COMMON.MSG_SUCCESS.read("Favorite"),data: ret});
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteById(req, res, next) {
    try {
      const favoriteId = req.params.id;
      const favoriteData = await favoriteService.getFavoriteById(favoriteId);
      if (favoriteData) {
        res.status(200).json({message: MSG_COMMON.MSG_SUCCESS.read("Payment"),data: favoriteData});
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async createFavorite(req, res, next) {
    const favoriteData = req.body;
    try {
      const ret = await favoriteService.createFavorite(favoriteData);
      res
        .status(201)
        .json({ message: MSG_COMMON.MSG_SUCCESS.create("Favorite"), data: ret });
    } catch (error) {
      next(error);
    }
  }

  async deleteFavorite(req, res, next) {
    try {
      const favoriteId = req.params.id;
      const deletedFavorite = await favoriteService.deleteFavorite(favoriteId);
      if (deletedFavorite) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("Favorite"), data: deletedFavorite });
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
