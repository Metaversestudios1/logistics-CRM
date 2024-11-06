const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: {
      phone: String,
      email: String,
    },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assuming a user with 'manager' role manages the warehouse
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  });
  