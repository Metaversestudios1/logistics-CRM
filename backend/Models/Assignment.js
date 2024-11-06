const mongoose = require("mongoose");
const AssignmentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // owner/admin
    pickupLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    deliveryLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    assignedDate: { type: Date, default: Date.now },
    completedDate: Date,
  });
  