const express = require('express');
const router = express.Router();
const {
  createAssignment,
  updateAssignment,
  getAssignment,
  getAllAssignments,
  deleteAssignment,
} = require('../Controllers/AssignmentController');

// Create a new assignment
router.post('/', createAssignment);

// Update an assignment
router.put('/:id', updateAssignment);

// Get a single assignment
router.get('/:id', getAssignment);

// Get all assignments
router.get('/', getAllAssignments);

// Delete an assignment
router.delete('/:id', deleteAssignment);

module.exports = router;
