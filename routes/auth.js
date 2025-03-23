const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  db.query('SELECT * FROM students WHERE email = ? AND password = ?', 
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      
      if (results.length > 0) {
        res.json({ success: true, student: results[0] });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }
  );
});

// Signup route
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  db.query('INSERT INTO students (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') { // Duplicate email
          return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        console.error('Signup error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      res.json({ success: true, message: 'Registration successful' });
    }
  );
});

module.exports = router; 