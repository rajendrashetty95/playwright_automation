const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  const card = page
    .locator('p', { hasText: 'Men Tshirt' })
    .first()
    .locator('xpath=ancestor::div[contains(@class,"product-image-wrapper")]')
    .first();
  console.log(await card.evaluate(el => el.outerHTML));
  await browser.close();
})();
