const Assignment = require('../models/Assignment');

// Create a new assignment
const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ success: true, message: "Assignment created", assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating assignment", error });
  }
};

// Update an assignment
const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAssignment) return res.status(404).json({ success: false, message: "Assignment not found" });
    res.status(200).json({ success: true, message: "Assignment updated", updatedAssignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating assignment", error });
  }
};

// Get a single assignment
const getAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id).populate('product').populate('employee');
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });
    res.status(200).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching assignment", error });
  }
};

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({}).populate('product').populate('employee');
    res.status(200).json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching assignments", error });
  }
};

// Delete an assignment
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) return res.status(404).json({ success: false, message: "Assignment not found" });
    res.status(200).json({ success: true, message: "Assignment deleted", deletedAssignment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting assignment", error });
  }
};

module.exports = {
  createAssignment,
  updateAssignment,
  getAssignment,
  getAllAssignments,
  deleteAssignment,
};
