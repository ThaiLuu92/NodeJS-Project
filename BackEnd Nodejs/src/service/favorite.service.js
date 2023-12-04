import FavoriteRepository from "../repository/favorite.repository.js";
const favoriteRepository = new FavoriteRepository();

export default class FavoriteService {
    async getFavorite() {
      try {
        const data = await favoriteRepository.getFavorite();
        return data;
      } catch (error) {
        throw error;
      }
    }
  
    async getFavoriteById(id) {
      try {
        const favoriteById = await favoriteRepository.getFavoriteById(id);
        return favoriteById;
      } catch (error) {
        throw error;
      }
    }
  
    async createFavorite(item) {
      try {
        const data = await favoriteRepository.createFavorite(item);
        return data;
      } catch (error) {
        throw error;
      }
    }
  
    async deleteFavorite(id) {
      try {
        const data = await favoriteRepository.deleteFavorite(id);
        return data;
      } catch (error) {
        throw error;
      }
    }
  
  }
  