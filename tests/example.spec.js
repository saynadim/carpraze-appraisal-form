const {test, expect} = require('@playwright/test');

test('should open modal on click', async ({page }) => {
    await page.goto('http://127.0.0.1:3000/example.html'); // replace with your website URL

    await page.click('.cp-appraisal-btn');
    const modal = await page.$('#cp-appraisal-modal.cp-show-modal');
    expect(modal).toBeTruthy();
});

test('should close modal on close button click', async ({page }) => {
    await page.goto('http://127.0.0.1:3000/example.html'); // replace with your website URL

    await page.click('.cp-appraisal-btn');
    await page.click('.cp-close-button');
    const modal = await page.$('#cp-appraisal-modal.cp-show-modal');
    expect(modal).toBeNull();
});

test('should submit form and display success message', async ({page }) => {
    await page.goto('http://127.0.0.1:3000/example.html'); // replace with your website URL

    await page.click('.cp-appraisal-btn');
    await page.fill('#cp_first_name', 'Test');
    await page.fill('#cp_last_name', 'User');
    await page.fill('#cp_email', 'testuser@example.com');
    await page.fill('#cp_phone', '1234567890');
    await page.click('#cp-appraisal-form input[type=submit]');

    // You may need to adjust this wait time
    await page.waitForTimeout(3000);

    const successMessage = await page.$('div.cp-success-message');
    expect(successMessage).toBeTruthy();
});
