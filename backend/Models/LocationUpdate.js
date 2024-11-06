const mongoose = require("mongoose");
const LocationUpdateSchema =new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // reference to the order being delivered
    location: {
      latitude: Number,
      longitude: Number,
    },
    images: [
      {
        url: String,
        description: String, // e.g., "Product loaded", "Delivery site", etc.
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    statusUpdate: String, // e.g., "picked up", "en route", "delivered"
    notes: String, // Additional details if needed
    timestamp: { type: Date, default: Date.now },
  });
  