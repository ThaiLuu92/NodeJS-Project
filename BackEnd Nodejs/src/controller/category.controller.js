
import CategoryService from "../service/category.service.js";
import { MSG_COMMON } from "../messages/index.js";

const categoryService = new CategoryService();

class CategoryController {
  async getAllCategories(req, res, next) {
    try {
      const ret = await categoryService.getCategory();
      if (ret) {
        res.status(200).json(ret);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllDeletedCategory(req, res, next) {
    try {
      const ret = await categoryService.getDeletedCategory();
      if (ret) {
        res.status(200).json(ret);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const categoryId = req.params.id;
      const categoryData = await categoryService.getCategoryById(categoryId);
      if (categoryData) {
        res.status(200).json(categoryData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async getDeletedCategoryById(req, res, next) {
    try {
      const categoryId = req.params.id;
      const categoryData = await categoryService.getDeletedCategoryById(categoryId);
      if (categoryData) {
        res.status(200).json(categoryData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.read("Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    const categoryData = {...req.body};
    try {
      const ret = await categoryService.createCategory(categoryData);
      if (ret) {
        res
        .status(201)
        .json({ message: MSG_COMMON.MSG_SUCCESS.create("Category") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.create("Category") });
      }
      
    } catch (error) {
      next(error);
    }
  }

  async deleteAllDeletedCategory(req, res, next) {
    try {
      const deletedCategory = await categoryService.deleteAllDeletedCategory();
      if (deletedCategory) {
        res
          .status(200) 
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("All Category") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.delete("All Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await categoryService.deleteCategory(categoryId);
      if (deletedCategory) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.delete("Category") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.delete("Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async softDeleteCategory(req, res, next) {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await categoryService.softDeleteCategory(categoryId);
      if (deletedCategory) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.softDelete("Category") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.softDelete("Category") });
      }
    } catch (error) {
      next(error);
    }
  }

  async restoreCategory (req, res, next) {
    try {
      const categoryId = req.params.id;
      const restoreCategory = await categoryService.restoreCategory(categoryId);
      if (restoreCategory) {
        res
          .status(200)
          .json({ message: MSG_COMMON.MSG_SUCCESS.restore(`Category with ID: ${categoryId} `)});
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.restore(`Category with ID: ${categoryId} `) });
      }
    } catch (error) {
      next(error);
    }
   }

  async editCategory(req, res, next) {
    const categoryId = req.params.id;
    const updatedData = req.body;
    try {
      const ret = await categoryService.editCategory(categoryId, updatedData);
      if (ret) {
        res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("Category") });
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_FAILURE.update("Category") });
      }
      
    } catch (error) {
      next(error);
    }
  }

  async searchCategoryByCondition(req, res, next) {
    try {
      const query = req.query ;
      const condition = {
        key: Object.keys(query)[0], value: Object.values(query)[0]
      }
      const categoryData = await categoryService.searchCategoryByCondition(condition);
      if (categoryData) {
        res.status(200).json(categoryData);
      } else {
        res
          .status(404)
          .json({ message: MSG_COMMON.MSG_ERROR.NotFoundException });
      }
    } catch (error) {
      next(error);
    }
  }

  async editCategoryChangeStatus(req, res, next) {
    const id = req.params.id;
    const status = req.body;
    try {
      const ret = await categoryService.editCategoryChangeStatus(id, status);
      res
        .status(200)
        .json({ message: MSG_COMMON.MSG_SUCCESS.update("Category") });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
