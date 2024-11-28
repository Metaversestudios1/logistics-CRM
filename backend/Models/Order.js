// OrderSchema
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, default: uuidv4 },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true, // Quantity of the product being ordered
        },
      },
    ], // Array of products
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    }, // Employee responsible
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
    },
    deliveryAddress: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in_transit", "delivered"],
      default: "pending",
    },
    locationUpdates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LocationUpdate",
      },
    ],
    pickupDate: Date,
    deliveryDate: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    updatedAt: Date,
  },
  { timestamps: true, collection: "Order" }
);

module.exports = mongoose.model("Order", OrderSchema);
