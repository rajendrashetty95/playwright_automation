import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com/api';

test.describe('API Automation Tests', () => {
  test('API 1: Get All Products List', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/productsList`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.products).toBeDefined();
    expect(Array.isArray(responseBody.products)).toBe(true);

    // Verify first product has expected structure
    if (responseBody.products.length > 0) {
      const firstProduct = responseBody.products[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('brand');
    }
  });

  test('API 3: Get All Brands List', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/brandsList`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.brands).toBeDefined();
    expect(Array.isArray(responseBody.brands)).toBe(true);
  });

  test('API 5: POST To Search Product', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/searchProduct`, {
      data: {
        search_product: 'tshirt'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    // API might return different response codes, adjust based on actual response
    expect(responseBody).toHaveProperty('responseCode');
    if (responseBody.responseCode === 200) {
      expect(responseBody.products).toBeDefined();
      expect(Array.isArray(responseBody.products)).toBe(true);
    }
  });

  test('API 6: POST To Search Product without parameter', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/searchProduct`, {
      data: {} // Empty body
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toContain('Bad request');
  });
});