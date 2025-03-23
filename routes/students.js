const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all students
router.get('/', (req, res) => {
  db.query('SELECT id, name, email, created_at FROM students ORDER BY created_at DESC', 
    (err, results) => {
      if (err) {
        console.error('Error fetching students:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      res.json({ success: true, students: results });
    }
  );
});

// Delete student
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ success: false, message: 'Student ID is required' });
  }

  db.query('DELETE FROM students WHERE id = ?', 
    [id],
    (err, results) => {
      if (err) {
        console.error('Error deleting student:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      
      res.json({ success: true, message: 'Student deleted successfully' });
    }
  );
});

module.exports = router; 