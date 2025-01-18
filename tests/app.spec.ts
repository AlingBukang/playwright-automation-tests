import { test, expect } from '@playwright/test';

test.describe('Web App Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your app's URL before each test
    await page.goto('/');
  });

  test('should load the homepage @smoke', async ({ page }) => {
    // Check if the page loads successfully
    await expect(page).toHaveTitle('Todo App');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle navigation', async ({ page }) => {
    // Test navigation between pages
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/.*about/);
  });
}); 