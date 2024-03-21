const {test, expect} = require('@playwright/test');

test('should open modal on click', async ({page }) => {
    await page.goto('http://127.0.0.1:3000/examples/example.html'); // replace with your website URL

    await page.click('.cp-appraisal-btn');
    const modal = await page.$('#cp-appraisal-modal.cp-show-modal');
    expect(modal).toBeTruthy();
});

test('should close modal on close button click', async ({page }) => {
    await page.goto('http://127.0.0.1:3000/examples/example.html'); // replace with your website URL

    await page.click('.cp-appraisal-btn');
    await page.click('.cp-close-button');
    const modal = await page.$('#cp-appraisal-modal.cp-show-modal');
    expect(modal).toBeNull();
});

test('should submit form and display success message', async ({page }) => {
    await page.goto('http://127.0.0.1:3000/examples/example.html'); // replace with your website URL

    await submitFormWithGenericInput(page)

    const successMessage = await page.$('div.cp-success-message');
    expect(successMessage).toBeTruthy();
});

test('should throw exception on invalid configuration', async ({ page }) => {
    // Listen for page errors
    let errorMessage = '';
    page.on('pageerror', error => {
        errorMessage = error.message;
    });

    await page.goto('http://127.0.0.1:3000/examples/example-error.html'); // replace with your website URL
    // Wait for a short period to ensure the page has loaded and the error has occurred
    // This might need adjustment based on the page's load time
    await page.waitForTimeout(1000);

    // Assert the error message
    expect(errorMessage).toContain("carprazeForm:token meta is required");
})

async function submitFormWithGenericInput(page) {
  await page.click('.cp-appraisal-btn');
  await page.fill('#cp_first_name', 'Test');
  await page.fill('#cp_last_name', 'User');
  await page.fill('#cp_email', 'testuser@example.com');
  await page.fill('#cp_phone', '1234567890');
  await page.click('#cp-appraisal-form input[type=submit]');

  // You may need to adjust this wait time
  await page.waitForTimeout(5000);
}

// Helper function to parse multipart form data
function parseMultipartFormData(boundary, data) {
  const formData = {};
  const boundaryString = `--${boundary}`;

  // Split the content by the boundary string and filter out empty items
  data.split(boundaryString).forEach(item => {
    const [headers, value] = item.split('\r\n\r\n');
    if (headers && value !== undefined) {
      const nameMatch = headers.match(/name="([^"]+)"/);
      if (nameMatch) {
        // Remove the trailing '\r\n' from the value
        formData[nameMatch[1]] = value.replace(/\r\n$/, '');
      }
    }
  });

  return formData;
}


test('should use custom formType meta tag', async ({ page }) => {
  // Variable to hold request data
  let formData = null;

  // Intercept request and check if it's the form submission
  await page.route('https://app.carpraze.com/api/v1/iframe/customer/input', (route) => {
    // Only intercept POST requests
    if (route.request().method() === 'POST') {
      const contentTypeHeader = route.request().headers()['content-type'];
      const match = contentTypeHeader.match(/boundary=(.*)$/);
      if (match) {
        formData = parseMultipartFormData(match[1], route.request().postData());
      }

      route.continue();
    } else {
      route.continue();
    }
  });

  await page.goto('http://127.0.0.1:3000/examples/example-meta-formtype.html'); // replace with your website URL
  await submitFormWithGenericInput(page);
  await page.waitForTimeout(5000);

  expect(formData.form_type).toEqual('customType');
})
