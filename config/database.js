const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD, // or your password
  database: "student_management"
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to database');
  
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Fai3anali040';
  // FLUSH PRIVILEGES;

});

module.exports = db; 