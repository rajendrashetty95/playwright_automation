import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get cartRows() {
    return this.page.locator('table tbody tr');
  }

  async verifyProductInCart(name: string, price: string) {
    const row = this.cartRows.filter({ hasText: name }).first();
    await expect(row).toBeVisible();
    if (price) {
      await expect(row).toContainText(price);
    }
  }

  async isEmpty() {
    return await this.page.locator('text=Cart is empty').isVisible();
  }
}
