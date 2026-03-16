
import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  get menTshirtProduct() {
    return this.page.locator('p').filter({ hasText: 'Men Tshirt' }).first();
  }

  async verifyMenTshirtPrice() {
    await expect(this.menTshirtProduct.locator('..').locator('h2')).toHaveText('Rs. 400');
  }

  async clickAddToCartMenTshirt() {
    await this.menTshirtProduct.locator('..').locator('text=Add to cart').click();
  }
}