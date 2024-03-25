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
  async getAllCategories(req, res) {
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
}

module.exports = new CategoryController();
