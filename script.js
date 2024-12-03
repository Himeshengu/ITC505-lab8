// Function to validate the form
function validateForm() {
    let formValid = true;
    const firstName = sanitizeInput(document.getElementById('firstName').value.trim());
    const lastName = sanitizeInput(document.getElementById('lastName').value.trim());
    const email = sanitizeInput(document.getElementById('email').value.trim());
    const password = sanitizeInput(document.getElementById('password').value.trim());
    const confirmPassword = sanitizeInput(document.getElementById('confirmPassword').value.trim());
    const errorMessages = document.getElementById('errorMessages');

    errorMessages.innerHTML = ''; // Clear previous error messages

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errorMessages.innerHTML = '<p>All fields are required.</p>';
        formValid = false;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        errorMessages.innerHTML += '<p>Passwords do not match.</p>';
        formValid = false;
    }

    // If form is valid, display the success popup
    if (formValid) {
        // Prevent the form from submitting (page refresh)
        event.preventDefault();
        showModal(); // Show the success modal
    }

    return formValid; // Return true if form is valid, else false
}

// Function to sanitize input to prevent XSS
function sanitizeInput(input) {
    // Basic sanitization: Remove script tags and encode dangerous characters
    return input.replace(/<script.*?>.*?<\/script>/gi, "") // Remove script tags
                .replace(/[<>]/g, function (char) { return `&#${char.charCodeAt(0)};`; }); // Encode '<' and '>'
}

// Function to check password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const passwordStrengthMessage = document.getElementById('passwordStrengthMessage');
    const regexWeak = /^(?=.*[a-z]).{6,}$/; // At least one lowercase letter and 6 characters
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/; // At least one uppercase, number, and 8 characters
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{10,}$/; // At least one special character and 10 characters

    if (password.match(regexStrong)) {
        passwordStrengthMessage.textContent = 'Strong Password';
        passwordStrengthMessage.className = 'strong';
    } else if (password.match(regexMedium)) {
        passwordStrengthMessage.textContent = 'Medium Password';
        passwordStrengthMessage.className = 'medium';
    } else if (password.match(regexWeak)) {
        passwordStrengthMessage.textContent = 'Weak Password';
        passwordStrengthMessage.className = 'weak';
    } else {
        passwordStrengthMessage.textContent = 'Password is too weak';
        passwordStrengthMessage.className = 'weak';
    }
}

// Function to check if the passwords match
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordMatchMessage = document.getElementById('passwordMatchMessage');

    if (password !== confirmPassword) {
        passwordMatchMessage.textContent = 'Passwords do not match.';
        passwordMatchMessage.style.color = 'red';
    } else {
        passwordMatchMessage.textContent = 'Passwords match!';
        passwordMatchMessage.style.color = 'green';
    }
}

// Function to show the success modal
function showModal() {
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage'); // Get the modal message element
    modalMessage.textContent = "Form has been submitted successfully."; // Update message
    modal.style.display = 'block'; // Display the modal
}

// Function to close the success modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none'; // Hide the modal when the user clicks on the close button
}
