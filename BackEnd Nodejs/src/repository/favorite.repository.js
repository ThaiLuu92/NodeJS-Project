import { getData, insertData, deleteData, editData, getDataById} from "../../utils/data.util.js";
import Favorite from "../models/favorite.model.js";


export default class FavoriteRepository {
  async getFavorite() {
    try {
      const favoriteData = await getData(Favorite);
      return favoriteData;
    } catch (error) {
      throw error;
    }
  }
  async getFavoriteById(id) {
    try {
      const favoriteById = await getDataById(Favorite, id);
      return favoriteById;
    } catch (error) {
      throw error;
    }
  }
  async createFavorite(data) {
    try {
      const newFavorite = await insertData(Favorite, data);
      return newFavorite;
    } catch (error) {
      throw error;
    }
  }

  async deleteFavorite(id) {
    try {
      const deleteFavorite = await deleteData(Favorite, id);
      return deleteFavorite;
    } catch (error) {
      throw error;
    }
  }
}
