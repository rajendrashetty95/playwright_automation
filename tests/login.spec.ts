import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Page Automation', () => {
  test('should show error for invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://automationexercise.com/login');

    await loginPage.login('invalid@example.com', 'wrongpassword');

    // Verify error message appears
    await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
  });

  // Note: For valid login test, you need to provide actual credentials
  // or create an account first. The signup process requires filling additional details.
  // Uncomment and modify with real credentials if available:
  /*
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://automationexercise.com/login');

    await loginPage.login('validemail@example.com', 'validpassword');

    await loginPage.verifyLoginSuccess();
  });
  */
});