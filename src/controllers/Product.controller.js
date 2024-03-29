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

  async getAllProducts(req, res) {
    try {
      const allProducts = await Product.find({}).populate("categoryId");
      if (!allProducts) {
        res.send(404).json("No products found");
      }

      res.status(200).json({
        message: "Products found",
        products: allProducts,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const getProduct = await Product.findById(id).populate("categoryId");

      if (!getProduct) {
        res.status(404).json("Product not found");
      }
      res.status(200).json({
        message: "Product found",
        product: getProduct,
      });
    } catch (error) {
      Logger.error(error);
    }
  }

  // Update a product
  // async updateProduct(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const {
  //       name,
  //       description,
  //       price,
  //       stock,
  //       temperature_requirement,
  //       weight,
  //     } = req.body;
  //   } catch (error) {
  //     Logger.error(error);
  //   }
  // }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updatedFields = req.body; // All fields to update are in req.body

      // Find the product by ID and update it
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // If successful, send the updated product as a response
      res.status(200).json(updatedProduct);
    } catch (error) {
      Logger.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = new ProductController();
