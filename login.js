document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    // Focus on username field when page loads
    document.getElementById('username').focus();
    
    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = document.getElementById('remember').checked;
        
        // Simple validation
        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }
        
        // Show loading state
        const loginBtn = loginForm.querySelector('.login-btn');
        const originalBtnText = loginBtn.textContent;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        loginBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            // In a real app, you would make an API request to verify credentials
            // This is just a demo that accepts any login
            if (simulateLogin(username, password)) {
                // Save to local storage if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('yoga_chat_user', username);
                } else {
                    // Use session storage if not remember me
                    sessionStorage.setItem('yoga_chat_user', username);
                }
                
                // Log login event
                logActivity(username, 'login');
                
                // Redirect to chat page
                window.location.href = 'index.html';
            } else {
                // Show error and reset button
                showError('Invalid username or password');
                loginBtn.textContent = originalBtnText;
                loginBtn.disabled = false;
            }
        }, 1500);
    });
    
    // Check if user is already logged in
    checkExistingLogin();
    
    // Add event listeners for register and forgot password links
    document.querySelector('.register-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registration functionality would be implemented here');
    });
    
    document.querySelector('.forgot-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password recovery functionality would be implemented here');
    });
});

// Function to show error message
function showError(message) {
    // Remove any existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Add error styles
    errorElement.style.color = '#e91e63';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.padding = '10px 0';
    errorElement.style.textAlign = 'center';
    errorElement.style.animation = 'fadeIn 0.3s ease';
    
    // Insert after form
    const loginForm = document.getElementById('login-form');
    loginForm.parentNode.insertBefore(errorElement, loginForm.nextSibling);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        errorElement.style.opacity = '0';
        errorElement.style.transition = 'opacity 0.5s ease';
        setTimeout(() => errorElement.remove(), 500);
    }, 5000);
}

// Function to check if user is already logged in
function checkExistingLogin() {
    const savedUser = localStorage.getItem('yoga_chat_user') || sessionStorage.getItem('yoga_chat_user');
    
    if (savedUser) {
        // User is already logged in, redirect to chat
        window.location.href = 'index.html';
    }
}

// Function to simulate login verification
function simulateLogin(username, password) {
    // In a real app, this would make an API call to verify credentials
    // For this demo, we'll accept any login with a password of at least 4 characters
    return password.length >= 4;
}

// Function to log user activity
function logActivity(username, action) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        user: username,
        action: action,
        timestamp: timestamp,
        userAgent: navigator.userAgent
    };
    
    // Get existing logs from storage or initialize empty array
    let activityLogs = JSON.parse(localStorage.getItem('yoga_chat_logs') || '[]');
    
    // Add new log entry
    activityLogs.push(logEntry);
    
    // Save back to storage (maximum 100 entries to prevent storage issues)
    if (activityLogs.length > 100) {
        activityLogs = activityLogs.slice(-100);
    }
    
    localStorage.setItem('yoga_chat_logs', JSON.stringify(activityLogs));
    
    // In a real application, you might also send this to a server
    console.log('Log entry:', logEntry);
} 