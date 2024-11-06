const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    weight: { type: Number },
    quantity: { type: Number, required: true },
    dimensions: {
      typeOfProduct: String,
      length: Number,
      width: Number,
      height: Number,
      unit: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "Product" }
);

module.exports = mongoose.model("Product", ProductSchema);
