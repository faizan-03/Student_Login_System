// Constants
const API_BASE_URL = '/api';
const TOAST_DURATION = 3000;

// State management
const student = JSON.parse(sessionStorage.getItem('student'));
if (!student) window.location.href = 'login.html';

// Utility functions
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showToast = (message, isError = false) => {
    Toastify({
        text: message,
        duration: TOAST_DURATION,
        gravity: "top",
        position: "right",
        backgroundColor: isError ? "red" : "green",
    }).showToast();
};

// Show confirmation dialog using SweetAlert2
function showDialog(title, message, onConfirm, onCancel = null, type = "warning") {
    Swal.fire({
        title: title,
        text: message,
        icon: type,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed && typeof onConfirm === "function") {
            onConfirm();
        } else if (result.dismiss === Swal.DismissReason.cancel && typeof onCancel === "function") {
            onCancel();
        }
    });
}

// Fetch students and update UI
async function fetchStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const { success, students, message } = await response.json();
        
        if (!success) throw new Error(message);

        const studentsList = document.getElementById('studentsList');
        studentsList.innerHTML = students.length
            ? students.map(student => `
                <div class="student-card">
                    <div class="student-info">
                        <h3>${student.name}</h3>
                        <p>${student.email}</p>
                        <p class="meta">Joined: ${new Date(student.created_at).toLocaleDateString()}</p>
                    </div>
                    <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            `).join('')
            : '<div class="no-data">No students found.</div>';
    } catch (error) {
        document.getElementById('studentsList').innerHTML = 
            '<div class="error-message">Failed to load students. Please try again later.</div>';
        console.error('Error fetching students:', error);
    }
}

// Add a new student
async function addStudent(studentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        const { success, message } = await response.json();

        if (success) {
            showToast("Student added successfully!");
            document.getElementById('addStudentForm').reset();
            await fetchStudents();
        } else {
            showToast(message, true);
        }
    } catch (error) {
        showToast("Error adding student. Please try again.", true);
        console.error('Error adding student:', error);
    }
}

// Delete a student
async function deleteStudent(id) {
    showDialog(
        'Delete Student',
        'Are you sure you want to delete this student? This action cannot be undone.',
        async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/students/${id}`, {
                    method: 'DELETE'
                });

                const { success, message } = await response.json();

                if (success) {
                    showToast("Student deleted successfully!");
                    await fetchStudents();
                } else {
                    showToast(message, true);
                }
            } catch (error) {
                showToast("Error deleting student. Please try again.", true);
                console.error('Error deleting student:', error);
            }
        }
    );
}

// Handle student addition form submission
document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('newName').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value;

    if (!name || !email || !password) {
        showToast("Please fill in all fields", true);
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters long", true);
        return;
    }

    if (!isValidEmail(email)) {
        showToast("Please enter a valid email address", true);
        return;
    }

    await addStudent({ name, email, password });
});

// Logout function
function logout() {
    sessionStorage.removeItem('student');
    window.location.href = 'login.html';
}

// Initialize student list
fetchStudents();
