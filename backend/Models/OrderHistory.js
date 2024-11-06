const mongoose = require("mongoose");
const OrderHistorySchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    locationUpdates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LocationUpdate' }],
    activityLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeActivityLog' }],
    createdAt: { type: Date, default: Date.now },
  });
  