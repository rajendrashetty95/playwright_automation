
import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  /**
   * Returns the product card containing a product name.
   * The page has products rendered as a paragraph (`<p>`) with the product name.
   */
  productByName(productName: string) {
    return this.page.locator('p').filter({ hasText: productName }).first();
  }

  async clickAddToCartByName(productName: string) {
    // Some ads (iframes) can intercept pointer events; force click is more reliable.
    await this.productByName(productName).locator('..').locator('text=Add to cart').click({ force: true });
  }

  async clickViewProductByName(productName: string) {
    await this.productByName(productName).locator('..').locator('text=View Product').click();
  }

  async verifyPriceByName(productName: string, expectedPrice: string) {
    await expect(this.productByName(productName).locator('..').locator('h2')).toHaveText(expectedPrice);
  }

  async goToCategory(category: 'Women' | 'Men' | 'Kids') {
    await this.page.locator(`a[href="#${category}"]`).click();
  }

  // Legacy helpers (kept for backwards compatibility)
  get menTshirtProduct() {
    return this.productByName('Men Tshirt');
  }

  async verifyMenTshirtPrice() {
    await this.verifyPriceByName('Men Tshirt', 'Rs. 400');
  }

  async clickAddToCartMenTshirt() {
    await this.clickAddToCartByName('Men Tshirt');
  }
}