const Logger = require("../middlewares/logger/logger");
const Category = require("./../models/category.model");

class CategoryController {
  constructor() {}
  async addCategory(req, res) {
    try {
      const { name } = req.body;
      const newCategory = new Category({ name });

      await newCategory.save();

      res.status(201).json({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      Logger.error(error);
    }
  }
  async getAllCategories(_, res) {
    try {
      const categories = await Category.find({});
      if (!categories) {
        res.status(404).json("No Categories found");
      }
      res.status(200).json({
        message: "Categories found",
        categories,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      Logger.error(error);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const findCategoryAndUpdate = await Category.findByIdAndUpdate(id, {
        name,
      });

      if (!findCategoryAndUpdate) {
        res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = new CategoryController();
