const mongoose = require("mongoose");
const DealerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: { 
      type: String,
      required: true,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    businessDetails: {
      registrationNumber: String,
      taxId: String,
      gstNumber: String, // If applicable
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  { timestamps: true, collection: "Dealer" }
);

module.exports = mongoose.model("Dealer", DealerSchema);
