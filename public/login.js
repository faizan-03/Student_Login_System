document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Reset error messages
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    
    // Basic validation
    if (!email || !password) {
        if (!email) emailError.textContent = 'Email is required';
        if (!password) passwordError.textContent = 'Password is required';
        return;
    }
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store student data in sessionStorage
            sessionStorage.setItem('student', JSON.stringify(data.student));
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            emailError.textContent = data.message;
            emailError.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        emailError.textContent = 'An error occurred. Please try again.';
        emailError.style.display = 'block';
    }
}); 