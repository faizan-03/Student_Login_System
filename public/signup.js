document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Validation
    let hasError = false;
    
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        hasError = true;
    }
    
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    } else if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }
    
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('confirmPasswordError').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Account created successfully! Redirecting to login...';
            successMessage.style.display = 'block';
            document.querySelector('.container').appendChild(successMessage);
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            document.getElementById('emailError').textContent = data.message;
            document.getElementById('emailError').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('emailError').textContent = 'An error occurred. Please try again.';
        document.getElementById('emailError').style.display = 'block';
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
