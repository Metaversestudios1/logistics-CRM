const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    role: {type: String, required: true},
    description: {type: String, required: true},
    updatedAt:{ type: Date},
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default:null },
  },{ timestamps: true, collection: "Category" });
  
module.exports = mongoose.model("Category", CategorySchema);
