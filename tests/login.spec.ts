import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../config/testData';

test.describe('Login Page Automation', () => {
  test('should show error for invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://automationexercise.com/login');

    await loginPage.login('invalid@example.com', 'wrongpassword');

    // Verify error message appears - check for common error classes
    await expect(page.locator('.alert-danger, .error, p[style*="color:red"]')).toBeVisible();
  });

  // Note: Valid login test requires real account credentials in .env file
  // Create an account on the website first, then update .env with TEST_EMAIL and TEST_PASSWORD
  test.skip('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://automationexercise.com/login');

    await loginPage.login(testData.login.email, testData.login.password);

    await loginPage.verifyLoginSuccess();
  });
});