const mongoose = require("mongoose");
const DealerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: {
      phone: String,
      email: String,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  });
  