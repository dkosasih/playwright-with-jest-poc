import { test, expect, Page } from '@playwright/test';

test('get started link', async ({ browser }) => {
  let page: Page;
  page = await browser.newPage();

  await page.goto('https://playwright.dev/');
  
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();
  
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});