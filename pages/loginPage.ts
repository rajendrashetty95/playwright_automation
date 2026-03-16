import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Login form elements
  get emailInput() {
    return this.page.locator('input[placeholder="Email Address"]').first();
  }

  get passwordInput() {
    return this.page.locator('input[placeholder="Password"]');
  }

  get loginButton() {
    return this.page.locator('button:has-text("Login")');
  }

  // Signup form elements
  get signupNameInput() {
    return this.page.locator('input[placeholder="Name"]');
  }

  get signupEmailInput() {
    return this.page.locator('input[placeholder="Email Address"]').nth(1); // Second one for signup
  }

  get signupButton() {
    return this.page.locator('button:has-text("Signup")');
  }

  // Methods
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyLoginSuccess() {
    // After login, should be redirected to home or see logged in indicator
    await expect(this.page).toHaveURL(/\/$/); // Assuming redirects to home
    // Or check for logout button or user name
    await expect(this.page.locator('a[href="/logout"]')).toBeVisible();
  }
}