# Student Management System

A modern Student Management System built with Node.js, Express, MySQL, and a beautiful glassmorphism UI.

## Features

- Modern glassmorphism UI design
- Student login and signup functionality
- Dashboard to view all students
- Add new students
- Delete existing students
- Form validation
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd student-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a MySQL database:
```sql
CREATE DATABASE student_management;
```

4. Update the MySQL connection details in `server.js` if needed:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'student_management'
});
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

6. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
student-management-system/
├── public/
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── styles.css
│   ├── login.js
│   ├── signup.js
│   └── dashboard.js
├── server.js
├── package.json
└── README.md
```

## API Endpoints

- `POST /api/login` - Login with email and password
- `POST /api/signup` - Register a new student
- `GET /api/students` - Get all students
- `DELETE /api/students/:id` - Delete a student by ID

## Technologies Used

- Frontend:
  - HTML5
  - CSS3 (with glassmorphism effects)
  - JavaScript (ES6+)
  - Fetch API

- Backend:
  - Node.js
  - Express.js
  - MySQL2
  - CORS

## Security Notes

- This is a demo project and does not include JWT authentication
- Passwords are stored as plain text (not recommended for production)
- For production use, implement proper password hashing and JWT authentication

## Contributing

Feel free to submit issues and enhancement requests! 