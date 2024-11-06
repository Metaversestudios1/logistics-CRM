const mongoose = require("mongoose");
const EmployeeActivityLogSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String, // e.g., "checked in", "updated location", "uploaded image"
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    location: {
      latitude: Number,
      longitude: Number,
    },
    timestamp: { type: Date, default: Date.now },
    additionalInfo: String, // Extra details for specific actions
  });
  