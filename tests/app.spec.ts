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

  test('should have proper heading @smoke', async ({ page }) => {
    // Check if main heading exists
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Todo App');
  });
}); 