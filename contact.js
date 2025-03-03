document.addEventListener('DOMContentLoaded', function () {
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const errorMessage = document.getElementById('error-message');
    const charCount = document.createElement('p');
    charCount.id = 'char-count';
    messageField.parentNode.insertBefore(charCount, messageField.nextSibling);

    const maxChars = 500;
    const warningLimit = 50;
    const emailPattern = /^[a-zA-Z0-9@._-]+$/;
    const messagePattern = /^[A-Za-z0-9.,!?()'":;_&$%#@*+/-\s]*$/;

    // Initialize form_errors array
    const form_errors = [];

    // Function to show error message and capture error data
    function showError(message, field, fieldName) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = '1';
        field.classList.add('flash');

        setTimeout(() => {
            errorMessage.style.opacity = '0';
            field.classList.remove('flash');
        }, 2000);

        // Capture error data
        form_errors.push({
            field: fieldName,
            message: message
        });
    }

    // Email Validation
    emailField.addEventListener('input', function () {
        emailField.setCustomValidity('');

        if (!emailField.checkValidity()) {
            emailField.setCustomValidity('Please enter a valid email address.');
        }

        if (!emailPattern.test(emailField.value)) {
            showError('Invalid character entered in email.', emailField, 'email');
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
            messageField.value = messageField.value.substring(0, maxChars);
        } else {
            messageField.setCustomValidity('');
            charCount.style.color = remaining <= warningLimit ? 'orange' : 'black';
        }

        if (!messagePattern.test(messageField.value)) {
            showError('Invalid character entered in message.', messageField, 'message');
            messageField.value = messageField.value.replace(/[^A-Za-z0-9.,!?()'":;_&$%#@*+/-\s]/g, '');
        }
    });

    // Form submission event
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function (event) {
        // Prevent form submission if there are errors
        if (form_errors.length > 0) {
            event.preventDefault(); // Stop form submission
            console.log('Form Errors:', form_errors);

            // Add form_errors to the form as hidden field
            const formErrorsField = document.createElement('input');
            formErrorsField.type = 'hidden';
            formErrorsField.name = 'form-errors';
            formErrorsField.value = JSON.stringify(form_errors);
            form.appendChild(formErrorsField);

            // Submit the form after adding errors to the field
            form.submit();
        }
    });

    // Initialize counter
    charCount.textContent = `${maxChars} characters remaining`; 
});
