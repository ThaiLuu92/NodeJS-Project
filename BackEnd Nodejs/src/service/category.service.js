import CategoryRepository from "../repository/category.repository.js";

const categoryRepository = new CategoryRepository();

export default class CategoryService {
  async getCategory() {
    try {
      const data = await categoryRepository.getCategory();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedCategory() {
    try {
      const data = await categoryRepository.getDeletedCategory();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const categoryById = await categoryRepository.getCategoryById(id);
      return categoryById;
    } catch (error) {
      throw error;
    }
  }

  async getDeletedCategoryById(id) {
    try {
      const categoryById = await categoryRepository.getDeletedCategoryById(id);
      return categoryById;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(item) {
    try {
      const data = await categoryRepository.createCategory(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllDeletedCategory() {
    try {
      const data = await categoryRepository.deleteAllDeletedCategory();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const data = await categoryRepository.deleteCategory(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteCategory(id) {
    try {
      const data = await categoryRepository.softDeleteCategory(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async restoreCategory(id) {
    try {
      const data = await categoryRepository.restoreCategory(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editCategory(id, item) {
    try {
      const data = await categoryRepository.editCategory(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async searchCategoryByCondition(condition) {
    try {
      const categoryByCondition = await categoryRepository.searchCategoryByCondition(condition);
      return categoryByCondition;
    } catch (error) {
      throw error;
    }
  }

  async editCategoryChangeStatus(id, item) {
    try {
      const data = await categoryRepository.editCategory(id, item);
      return data;
    } catch (error) {
      throw error;
    }
  }


}
