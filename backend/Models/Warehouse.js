const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    currentInventory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    dispatchHistory: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        dispatchDate: { type: Date },
        delivered: { type: Boolean },
        deliveredDate: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    updatedAt: { type: Date },
  },
  { timestamps: true, collection: "Warehouse" }
);

module.exports = mongoose.model("Warehouse", WarehouseSchema);
