import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

// We will now navigate to the product details page for the Men Tshirt and
// perform the add-to-cart action there, then verify the cart contains the
// item.

test('Men Tshirt purchase scenario', async ({ page }) => {
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // 1. Go directly to the product details page
  await page.goto('https://automationexercise.com/product_details/2');

  // 2. Verify price is "Rs. 400"
  await productPage.verifyPrice('Rs. 400');

  // 3. Click on the add to cart
  await productPage.addToCart();

  // wait a short moment for the action to complete (modal or redirect)
  await page.waitForTimeout(1000);

  // 4. Navigate to cart and verify the item is present
  await page.goto('https://automationexercise.com/view_cart');
  await cartPage.verifyProductInCart('Men Tshirt', 'Rs. 400');
});