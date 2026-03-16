import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  get priceLocator() {
    // price is displayed as 'Rs. 400' within a generic element
    return this.page.locator('text=Rs. 400');
  }

  get addToCartButton() {
    return this.page.locator('button:has-text("Add to cart")');
  }

  async verifyPrice(expected: string) {
    await expect(this.priceLocator).toHaveText(expected);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
