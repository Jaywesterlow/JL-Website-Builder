// @ts-check
import { test, expect } from '@playwright/test';

test('Structure: HTML elements & metadata', async ({ page }) => {
  await page.goto('/dashboard');

  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);

  const lang = await page.locator('html').getAttribute('lang');
  expect(lang).toBeTruthy();

  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  expect(headings.length).toBeGreaterThan(0);

  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBeGreaterThan(0);

  const landmarkTotal = await page.locator('main, nav, header, footer, aside').count();
  expect(landmarkTotal).toBeGreaterThan(0);

  const skipLink = await page.locator('a[href^="#"], a.skip-link').first();
  expect(await skipLink.isVisible()).toBeTruthy();
});
