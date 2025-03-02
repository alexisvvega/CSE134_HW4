document.addEventListener('DOMContentLoaded', function () {
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const errorMessage = document.getElementById('error-message'); // Error message display area
    const charCount = document.createElement('p'); // Create a character count display
    charCount.id = 'char-count';
    messageField.parentNode.insertBefore(charCount, messageField.nextSibling); // Insert after textarea

    // Character limit
    const maxChars = 500;
    const warningLimit = 50; // Change color when 50 characters left

    // Allowed character patterns
    const emailPattern = /^[a-zA-Z0-9@._-]+$/;
    const messagePattern = /^[A-Za-z0-9.,!?()'":;_&$%#@*+/-\s]*$/;  

    // Function to show error message and fade it out
    function showError(message, field) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = '1';
        field.classList.add('flash');

        setTimeout(() => {
            errorMessage.style.opacity = '0';
            field.classList.remove('flash');
        }, 2000);
    }

    // Email Validation
    emailField.addEventListener('input', function () {
        emailField.setCustomValidity('');

        if (!emailField.checkValidity()) {
            emailField.setCustomValidity('Please enter a valid email address.');
        }

        if (!emailPattern.test(emailField.value)) {
            showError('Invalid character entered in email.', emailField);
            emailField.value = emailField.value.replace(/[^a-zA-Z0-9@._-]/g, '');
        }
    });

    // Message Validation & Character Counter
    messageField.addEventListener('input', function () {
        messageField.setCustomValidity('');

        let remaining = maxChars - messageField.value.length;
        charCount.textContent = `${remaining} characters remaining`;  

        if (messageField.value.length < 10) {
            messageField.setCustomValidity('Message must be at least 10 characters.');
        } else if (messageField.value.length > maxChars) {
            messageField.setCustomValidity('Message cannot exceed 500 characters.');
            charCount.style.color = 'red';
            messageField.value = messageField.value.substring(0, maxChars); // Prevent overflow
        } else {
            messageField.setCustomValidity('');
            charCount.style.color = remaining <= warningLimit ? 'orange' : 'black';
        }

        if (!messagePattern.test(messageField.value)) {
            showError('Invalid character entered in message.', messageField);
            messageField.value = messageField.value.replace(/[^A-Za-z0-9.,!?()'":;_&$%#@*+/-\s]/g, '');
        }
    });

    // Initialize counter
    charCount.textContent = `${maxChars} characters remaining`; 
});
