const mongoose = require("mongoose");
const Category = require("./category.model");

const productSchema = new mongoose.Schema(
  {
    product_id: { type: Number, unique: true, required: true },
    name: { type: String, maxlength: 20, required: true },
    description: { type: String, required: true },
    category_id: { type: Number, ref: "Category", required: true },
    image_url: { type: String, maxlength: 255 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    temperature_requirement: { type: String, maxlength: 50 },
    weight: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
