var carpraze_contact_form = (function () {
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
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    }
    
    .cp-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem 1.5rem;
        width: 24rem;
        border-radius: 0.5rem;
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
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }

    /* form styling */
    #cp-appraisal-form {
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
    `;
    // Define the HTML for the form
    var html = `
    <div class="cp-modal" id="cp-appraisal-modal">
        <div class="cp-modal-content">
            <span class="cp-close-button">×</span>
            <div class="cp-modal-header">
                <h2>Find out what your trade in is worth</h2>
            </div>
            <div class="cp-modal-description">
                <p>
                Fill out the form below and receive a Firm Offer from a Real Person (Not a computer-generated estimate).  
                Once your input your information, you will receive a text message and e-mail.  
                <strong>To get started you will need important information about your vehicle.</strong>
                </p>
            </div>
            <div class="cp-modal-form">
                <form id="cp-appraisal-form" method="post">
                    <input type="text" id="first_name" name="first_name" placeholder="First Name" required>
                    <input type="text" id="last_name" name="last_name" placeholder="Last Name" required>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                    <input type="text" id="phone" name="phone" placeholder="Phone" required>
                    <input type="submit" value="Submit">
                </form>
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
    widgetContainer.id = 'widget-container';
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
        document.getElementById('first_name').value = '';
        document.getElementById('last_name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';

        // Close the modal after 3 seconds
        setTimeout(function () {
            toggleModal();
        }, 3000);
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        var url = 'https://app.carpraze.com/api/v1/iframe/customer/input';

        var first_name = document.getElementById('first_name').value;
        var last_name = document.getElementById('last_name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;

        // Send form data to the server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = handleFormOnload;

        var data = new FormData();
        data.append('token', window.carprazeForm.token);
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('email', email);
        data.append('phone', phone);
        data.append('form_type', 'customerInput');

        xhr.send(data);
    }

    function toggleModal() {
        var modal = document.getElementById('cp-appraisal-modal');
        modal.classList.toggle("cp-show-modal");
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Attach event listeners for form submission and modal toggling
        document.querySelector(window.carprazeForm.selector).addEventListener('click', toggleModal);
        document.querySelector('.cp-close-button').addEventListener('click', toggleModal);
        document.getElementById('cp-appraisal-form').addEventListener('submit', handleFormSubmission);
    });
})();
