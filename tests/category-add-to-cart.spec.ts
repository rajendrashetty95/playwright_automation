import { test } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

test.describe('Category product add-to-cart', () => {
  test('Add Women product to cart via category section', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const productPage = new ProductPage(page);

    await page.goto('https://automationexercise.com/');
    await home.goToCategory('Women');

    // Navigate to the product details page before adding to cart
    await home.clickViewProductByName('Blue Top');
    await productPage.addToCart();

    // allow time for the add-to-cart action to complete (modal/animation)
    await page.waitForTimeout(1000);

    await page.goto('https://automationexercise.com/view_cart');
    await cart.verifyProductInCart('Blue Top', 'Rs. 500');
  });

  test('Add Men product to cart via category section', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);
    const productPage = new ProductPage(page);

    await page.goto('https://automationexercise.com/');
    await home.goToCategory('Men');

    await home.clickViewProductByName('Men Tshirt');
    await productPage.addToCart();

    await page.waitForTimeout(1000);

    await page.goto('https://automationexercise.com/view_cart');
    await cart.verifyProductInCart('Men Tshirt', 'Rs. 400');
  });
});
