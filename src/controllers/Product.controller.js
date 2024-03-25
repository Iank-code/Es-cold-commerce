const Logger = require("./../middlewares/logger/logger");
const Product = require("./../models/product.model");
const Category = require("./../models/category.model");

class ProductController {
  constructor() {}

  async createProduct(req, res) {
    try {
      const {
        name,
        description,
        image_url,
        price,
        stock,
        temperature_requirement,
        weight,
        categoryName,
      } = req.body;

      const category = await Category.findOne({
        name: categoryName,
      });

      if (!category) {
        res.status(404).json("No category found");
      }

      const newProduct = new Product({
        name,
        description,
        image_url,
        price,
        stock,
        temperature_requirement,
        weight,
        categoryId: category._id,
      });

      await newProduct.save();

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = new ProductController();
