const mongoose = require("mongoose");

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    category_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
