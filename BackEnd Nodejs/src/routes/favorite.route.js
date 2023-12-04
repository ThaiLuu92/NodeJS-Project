import express from "express";
import FavoriteController from "../controller/favorite.controller.js";
const favoritesRouter = express.Router();
const favoriteController = new FavoriteController();

// API Favorites

favoritesRouter.post("/", favoriteController.createFavorite);

favoritesRouter.delete("/:id", favoriteController.deleteFavorite);

favoritesRouter.get("/", favoriteController.getAllFavorite);

favoritesRouter.get("/:id", favoriteController.getFavoriteById);

export default favoritesRouter;