import express from "express";
import CategoryController from "../controller/category.controller.js";
import {
  validateCategory,
} from "../validations/category.validation.js";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

// API Category

categoryRouter.get("/search", categoryController.searchCategoryByCondition); // FrontEnd OK

categoryRouter.get("/trash", categoryController.getAllDeletedCategory);// FrontEnd OK

categoryRouter.get("/trash/:id", categoryController.getDeletedCategoryById);// FrontEnd OK

categoryRouter.get("/", categoryController.getAllCategories);// FrontEnd OK

categoryRouter.get("/:id", categoryController.getCategoryById);// FrontEnd OK

categoryRouter.delete("/delele-all", categoryController.deleteAllDeletedCategory);

categoryRouter.delete("/del-forever/:id", categoryController.deleteCategory);// FrontEnd OK

categoryRouter.delete("/:id", categoryController.softDeleteCategory);// FrontEnd OK

categoryRouter.put("/restore/:id", categoryController.restoreCategory);// FrontEnd OK

categoryRouter.put(
  "/:id",
  categoryController.editCategory
);// FrontEnd OK

categoryRouter.post(
  "/",
  validateCategory,
  categoryController.createCategory
);// FrontEnd OK

categoryRouter.patch(
  "/:id",
  categoryController.editCategoryChangeStatus
);// FrontEnd OK



export default categoryRouter;
