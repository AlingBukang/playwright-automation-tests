import { test, expect } from '@playwright/test';

test.describe('Web App Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your app's URL before each test
    await page.goto('http://localhost:3000');
  });

  test('should load the homepage @smoke', async ({ page }) => {
    // Check if the page loads successfully
    await expect(page).toHaveTitle(/Your App Name/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle navigation', async ({ page }) => {
    // Test navigation between pages
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/.*about/);
  });

  test('should handle form submission', async ({ page }) => {
    // Example form test
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Check for success message or redirect
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('should handle error states', async ({ page }) => {
    // Test error handling
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toBeVisible();
  });
}); 