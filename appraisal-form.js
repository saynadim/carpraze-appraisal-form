// version: 1.7
// last updated: 29/07/2023
var carpraze_contact_form = (function () {
    function initContactForm() {
        var carprazeForm = window.carprazeForm
        if (!carprazeForm) {
            const tokenMeta = document.querySelector('meta[name="carprazeForm:token"]');
            const selectorMeta = document.querySelector('meta[name="carprazeForm:selector"]');
            if (!tokenMeta) {
                throw new Error('carprazeForm:token meta is required. Please check the documentation. https://github.com/saynadim/carpraze-appraisal-form');
            } else if (!selectorMeta) {
                throw new Error('carprazeForm:selector meta is required. Please check the documentation. https://github.com/saynadim/carpraze-appraisal-form');
            }
            carprazeForm = {
                token: tokenMeta.getAttribute('content'),
                selector: selectorMeta.getAttribute('content')
            };
        } else {
            if (!carprazeForm.token) {
                throw new Error('carprazeForm.token is required. Please check the documentation. https://github.com/saynadim/carpraze-appraisal-form');
            } else if (!carprazeForm.selector) {
                throw new Error('carprazeForm.selector is required. Please check the documentation. https://github.com/saynadim/carpraze-appraisal-form');
            }
        }


        var token = carprazeForm.token;
        var selector = carprazeForm.selector;

        // Define the CSS
        var css = `
    .cp-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    }

    /* Additional styling for h2 element */
    .cp-modal h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 1em;
    }
    
    .cp-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem 1.5rem;
        width: 40rem;
        border-radius: 0.5rem;
    }
    
    .cp-modal-body {
        overflow: auto;
        max-height: calc(100vh - 200px);
    }
    
    .cp-close-button {
        float: right;
        width: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 0.25rem;
        background-color: lightgray;
    }
    
    .cp-close-button:hover {
        background-color: darkgray;
    }
    
    .cp-show-modal {
        opacity: 1;
        z-index: 999999;
        visibility: visible;
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        -webkit-transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    
    /* form styling */
    #cp-appraisal-form {
        display: -ms-grid;
        display: grid;
        gap: 1em;
        margin: auto;
    }
    
    #cp-appraisal-form label {
        font-size: 1.1em;
        font-weight: bold;
    }
    
    #cp-appraisal-form input[type=text],
    #cp-appraisal-form input[type=email] {
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
    }
    
    #cp-appraisal-form input[type=submit] {
        cursor: pointer;
        background-color: #4CAF50; /* green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        cursor: pointer;
        border-radius: 4px;
    }
    
    #cp-appraisal-form input[type=submit]:hover {
        background-color: #45a049;
    }
    
    .cp-modal-footer p {
        text-align: center;
    }
    
    .cp-footer-logo {
        vertical-align: middle;
        height: 40px;
    }
    /* Set max height and make modal body scrollable */
    .cp-modal-content {
        max-height: 80vh; /* Adjust this value as needed */
        overflow-y: auto;
    }

    /* Additional styling for scrollable modal body */
    .cp-modal-body {
        max-height: calc(80vh - 120px); /* Adjust this value based on your header and footer heights */
        overflow: auto;
    }

    @media (max-width: 768px) {
        /* Adjust the width and padding for mobile devices */
        .cp-modal-content {
            width: 90%;
            padding: 1rem;
        }
    }
    `;
        // Define the HTML for the form
        var html = `
    <div class="cp-modal" id="cp-appraisal-modal">
        <div class="cp-modal-content">
            <span class="cp-close-button">x</span>
            <div class="cp-modal-header">
                <h2>Find out what your trade in is worth</h2>
            </div>
            <div class="cp-modal-body">
                <div class="cp-modal-description">
                    <p>
                    Fill out the form below and receive an Offer from a Real Person (Not a computer-generated estimate). 
                    Once you input your information, you will receive a text message and e-mail
                    </p>
                </div>
                <div class="cp-modal-form">
                    <form id="cp-appraisal-form" method="post">
                        <input type="text" id="cp_first_name" name="cp_first_name" placeholder="First Name" required>
                        <input type="text" id="cp_last_name" name="cp_last_name" placeholder="Last Name" required>
                        <input type="email" id="cp_email" name="cp_email" placeholder="Email" required>
                        <input type="text" id="cp_phone" name="cp_phone" placeholder="Phone" required>
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </div>
            <div class="cp-modal-footer">
                <p>
                    <img class="cp-footer-logo" src="https://www.carza.ca/hosted/images/39/a73dbfe37740fb9d4b78950bbcdb0f/Screen_Shot_2021-05-28_at_1.11.13_PM-removebg-preview.png" />
                </p>
            </div>
        </div>
    </div>
    `;

        // Create a <style> element
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        // Create the widget container
        var widgetContainer = document.createElement('div');
        widgetContainer.id = 'cp-widget-container';
        widgetContainer.innerHTML = html;
        document.body.appendChild(widgetContainer);

        function handleFormOnload() {
            if (!(this.status === 200 || this.status === 201)) {
                console.error("There was an error with the request.");
                alert("There was an error with the request.")
                return;
            }

            var response = JSON.parse(this.responseText);
            // Create a success message element
            var successMessage = document.createElement("div");
            successMessage.classList.add("cp-success-message");
            successMessage.innerText = "Your request was successfully submitted!";
            successMessage.style.color = "green";
            successMessage.style.padding = "15px";
            successMessage.style.margin = "10px 0";
            successMessage.style.border = "1px solid green";
            successMessage.style.borderRadius = "5px";

            // Get the form and insert the success message after it
            var form = document.getElementById("cp-appraisal-form");
            form.parentNode.insertBefore(successMessage, form.nextSibling);

            // Clear form fields
            document.getElementById('cp_first_name').value = '';
            document.getElementById('cp_last_name').value = '';
            document.getElementById('cp_email').value = '';
            document.getElementById('cp_phone').value = '';

            // Close the modal after 3 seconds
            setTimeout(function () {
                toggleModal();
            }, 3000);
        }

        function handleFormSubmission(event) {
            event.preventDefault();
            var url = 'https://app.carpraze.com/api/v1/iframe/customer/input';

            var first_name = document.getElementById('cp_first_name').value;
            var last_name = document.getElementById('cp_last_name').value;
            var email = document.getElementById('cp_email').value;
            var phone = document.getElementById('cp_phone').value;

            // Send form data to the server
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onload = handleFormOnload;

            var data = new FormData();
            data.append('token', token);
            data.append('first_name', first_name);
            data.append('last_name', last_name);
            data.append('email', email);
            data.append('phone', phone);
            data.append('form_type', 'customerInput');

            xhr.send(data);
        }

        function handleClickOutsideModal(event) {
            // Check if the click event happened on the modal overlay (background)
            if (event.target.id === 'cp-appraisal-modal') {
                var form = document.getElementById('cp-appraisal-form');

                // Get all input fields in the form
                var inputs = form.querySelectorAll('input[type=text], input[type=email]');

                // Check if any input fields have been filled out
                var isAnyFieldFilled = Array.from(inputs).some(input => input.value !== '');

                // If at least one input field has been filled out, ask for confirmation
                if (isAnyFieldFilled) {
                    // If the user confirms they want to close the modal, close it
                    if (confirm('Are you sure you want to close the form? Your request is not complete yet.')) {
                        toggleModal();
                    }
                } else {
                    // If no input fields have been filled out, close the modal without asking for confirmation
                    toggleModal();
                }
            }
        }

        function toggleModal() {
            var modal = document.getElementById('cp-appraisal-modal');
            modal.classList.toggle("cp-show-modal");
        }

        // Attach event listeners for form submission and modal toggling
        document.querySelector(selector).addEventListener('click', toggleModal);
        document.querySelector('.cp-close-button').addEventListener('click', toggleModal);
        document.getElementById('cp-appraisal-form').addEventListener('submit', handleFormSubmission);

        // Listen for click events on the modal overlay (background)
        document.getElementById('cp-appraisal-modal').addEventListener('click', handleClickOutsideModal);
    }

    document.addEventListener('DOMContentLoaded', initContactForm);
})();
