const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // employee responsible
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
    status: { type: String, enum: ['pending', 'in_transit', 'delivered'], default: 'pending' },
    locationUpdates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LocationUpdate' }],
    pickupDate: Date,
    deliveryDate: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  });
  