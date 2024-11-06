const Warehouse = require('../Models/Warehouse');

// Create a new warehouse
const createWarehouse = async (req, res) => {
  try {
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    res.status(201).json({ success: true, message: "Warehouse created", warehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating warehouse", error });
  }
};

// Update a warehouse
const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWarehouse) return res.status(404).json({ success: false, message: "Warehouse not found" });
    res.status(200).json({ success: true, message: "Warehouse updated", updatedWarehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating warehouse", error });
  }
};

// Get a single warehouse
const getWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await Warehouse.findById(id);
    if (!warehouse) return res.status(404).json({ success: false, message: "Warehouse not found" });
    res.status(200).json({ success: true, warehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching warehouse", error });
  }
};

// Get all warehouses
const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({});
    res.status(200).json({ success: true, warehouses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching warehouses", error });
  }
};

// Delete a warehouse
const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWarehouse = await Warehouse.findByIdAndDelete(id);
    if (!deletedWarehouse) return res.status(404).json({ success: false, message: "Warehouse not found" });
    res.status(200).json({ success: true, message: "Warehouse deleted", deletedWarehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting warehouse", error });
  }
};

module.exports = {
  createWarehouse,
  updateWarehouse,
  getWarehouse,
  getAllWarehouses,
  deleteWarehouse,
};
