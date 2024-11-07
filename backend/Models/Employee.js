const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    employeeType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      default: 0, // Years of experience
    },
    availabilityStatus: {
      type: String,
      enum: ["Available", "On Assignment", "Unavailable"],
      default: "Available", // Current status of the employee
    },
    currentLocation: {
      type: {
        lat: Number,
        lng: Number,
      },
      default: null, // GPS coordinates for real-time tracking
    },
    assignedProducts: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        productId: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // Reference to the product being transported
          },
        ],
        status: {
          type: String,
          enum: ["Assigned", "In Transit", "Delivered", "Cancelled"],
          default: "Assigned",
        },
        assignedDate: {
          type: Date,
          default: Date.now, // Date when product was assigned
        },
        deliveryDate: Date, // Date when product was delivered
      },
    ],
    assignedTasks: [
      {
        taskDescription: {
          type: String,
        },
        status: {
          type: String,
          enum: ["Pending", "Completed"],
          default: "Pending",
        },
        assignedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 5, // Rating based on performance
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, collection: "Employee" }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
