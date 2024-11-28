const Order = require("../Models/Order");
const Employee = require("../Models/Employee");
const Product = require("../Models/Product");

// Create a new order

const assignOrderToEmployee = async (req, res) => {
  const {
    assignedTo,
    products,
    warehouse, 
    dealer,
    pickupDate,
    deliveryDate,
    deliveryAddress
  } = req.body;
  try {
    // Validate Employee
    const employee = await Employee.findOne({_id:assignedTo});
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Validate Products
    const productIds = products.map((item) => item.productId);
    const productsFromDb = await Product.find({ _id: { $in: productIds } });
    if (productsFromDb.length !== productIds.length) {
      return res.status(404).json({ message: "Some products not found" });
    }

    // Create a new Order
    const newOrder = new Order({
      products: products.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      assignedTo,
      warehouse,
      dealer,
      status: "pending",
      pickupDate,
      deliveryDate,
      deliveryAddress
    });

    const savedOrder = await newOrder.save();

    // Update Employee's assigned products with order and product details
    const assignedProducts = products.map((item) => ({
      orderId: savedOrder.orderId,
      productId: item.productId,
      quantity: item.quantity,
      status: "Assigned",
      assignedDate: new Date(),
    }));

    employee.assignedProducts.push(...assignedProducts);
    await employee.save();

    res.status(201).json({
      success: true,
      message: "Products successfully assigned to employee"
    });
  } catch (error) {
    console.error("Error in assigning products:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
// const createOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json({ success: true, message: "Order created", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error creating order", error });
//   }
// };

// // Update an order
// const updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//     res.status(200).json({ success: true, message: "Order updated", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error updating order", error });
//   }
// };

// // Get a single order
// const getOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id).populate('products'); // Assuming products is a reference
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching order", error });
//   }
// };

// // Get all orders
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate('products'); // Assuming products is a reference
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching orders", error });
//   }
// };

// // Delete an order
// const deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedOrder = await Order.findByIdAndDelete(id);
//     if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });
//     res.status(200).json({ success: true, message: "Order deleted", deletedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting order", error });
//   }
// };

module.exports = {
  assignOrderToEmployee,
};
