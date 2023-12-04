import {
  getData,
  insertData,
  deleteData,
  editData,
  getDataById,
  sortDeleteData,
  restoreData,
  getDeletedData,
  getDeletedDataById,
  getDataByCondition,
  deleteAllDataByCondition
} from "../../utils/data.util.js";
import { Category } from "../models/category.model.js";

export default class CategoryRepository {
  async getCategory() {
    try {
      const categoryData = await getData(Category);
      return categoryData;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedCategory() {
    try {
      const categoryData = await getDeletedData(Category);
      return categoryData;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const categoryById = await getDataById(Category, id);
      return categoryById;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedCategoryById(id) {
    try {
      const categoryById = await getDeletedDataById(Category, id);
      return categoryById;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(data) {
    try {
      const newCategory = await insertData(Category, data);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllDeletedCategory() {
    try {
      const deleteCategory = await deleteAllDataByCondition(Category);
      return deleteCategory;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteCategory(id) {
    try {
      const deleteCategory = await deleteData(Category, id);
      return deleteCategory;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteCategory(id) {
    try {
      const softDeleteCategory = await sortDeleteData(Category, id);
      return softDeleteCategory;
    } catch (error) {
      throw error;
    }
  }

  async restoreCategory(id) {
    try {
      const restoreCategory = await restoreData(Category, id);
      return restoreCategory;
    } catch (error) {
      throw error;
    }
  }

  async editCategory(id, item) {
    try {
      const editCategory = await editData(Category, id, item);
      return editCategory;
    } catch (error) {
      throw error;
    }
  }

  async searchCategoryByCondition(condition) {
    try {
      const searchCategoryByCondition = await getDataByCondition(Category, condition);
      return searchCategoryByCondition;
    } catch (error) {
      throw error;
    }
  }


}
