// app/static/js/main.js

// Function to handle form submission with AJAX (if required)
function submitForm(event, formId, actionUrl) {
    event.preventDefault();  // Prevents the default form submission

    let formData = new FormData(document.getElementById(formId));
    
    fetch(actionUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.success) {
            alert('Form submitted successfully!');
        } else {
            alert('Form submission failed.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Example of showing a success message after an action
function showMessage(message, type) {
    let messageContainer = document.createElement('div');
    messageContainer.classList.add(type === 'success' ? 'success-message' : 'error-message');
    messageContainer.innerText = message;
    document.body.appendChild(messageContainer);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}
