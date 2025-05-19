// @ts-check
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';

test('Accessibility & Performance Matrix', async ({ page, browserName }) => {
  // 1. Performance: Attach network listener before navigation
  let totalBytes = 0;
  let jsBytes = 0;
  let compressedAssets = 0;
  let cacheableAssets = 0;

  page.on('response', async (response) => {
    const headers = response.headers();
    const url = response.url();
    const size = Number(headers['content-length'] || 0);
    totalBytes += size;
    if (url.endsWith('.js')) jsBytes += size;
    if (headers['content-encoding']) compressedAssets++;
    if (headers['cache-control'] && !headers['cache-control'].includes('no-store')) cacheableAssets++;
  });

  // 2. Go to the page under test
  await page.goto('/dashboard'); // URL van pagina die wordt getest

  // 3. Accessibility: Axe-core scan
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);

  // 4. Accessibility: Playwright snapshot (for manual review)
  const snapshot = await page.accessibility.snapshot();
  // Save the snapshot for later review
  fs.writeFileSync(`accessibility-snapshot-${browserName}.json`, JSON.stringify(snapshot, null, 2));

  // 5. HTML structure checks
  // Title tag
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);

  // <html lang="..">
  const lang = await page.locator('html').getAttribute('lang');
  expect(lang).toBeTruthy();

  // Heading order (H1-H6)
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  expect(headings.length).toBeGreaterThan(0);

  // At least one <h1>
  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBeGreaterThan(0);

  // Landmark usage: <main>, <nav>, <header>, <footer>, <aside>
  const mainCount = await page.locator('main').count();
  const navCount = await page.locator('nav').count();
  const headerCount = await page.locator('header').count();
  const footerCount = await page.locator('footer').count();
  const asideCount = await page.locator('aside').count();

  // At least one landmark element exists
  expect(mainCount + navCount + headerCount + footerCount + asideCount).toBeGreaterThan(0);

  // Skip-to-content link
  const skipLink = await page.locator('a[href^="#"], a.skip-link').first();
  expect(await skipLink.isVisible()).toBeTruthy();

  // 6. Responsive layout: Check viewport and layout
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  if (viewport) {
    expect(viewport.width).toBeGreaterThan(0);
    expect(viewport.height).toBeGreaterThan(0);
  }

  // 7. Tap target sizes (axe-core covers this)
  // 8. Color contrast (axe-core covers this)
  // 9. ARIA usage (axe-core covers this)

  // 10. Performance: JS execution time, asset size, compression, caching
  // Reload to trigger network events
  await page.reload();

  // Wait for network to be idle
  await page.waitForLoadState('networkidle');

  // 11. Lighthouse metrics (FCP, LCP, TTI, TBT, CLS)
  // Playwright does not natively run Lighthouse. You must run Lighthouse via Node.js CLI or programmatically.
  // See: https://playwright.dev/docs/performance#using-lighthouse

  // 12. Manual checks for device/browser combos Playwright can't emulate
  // e.g., Samsung Internet, Silk, Smart TV browsers, etc.
  // TODO: Run these tests manually or with a different tool

  // 13. Output summary (for demo purposes)
  console.log({
    browser: browserName,
    title,
    lang,
    totalBytes,
    jsBytes,
    compressedAssets,
    cacheableAssets,
    accessibilityViolations: accessibilityScanResults.violations.length,
    headings: headings.length,
    h1Count,
    mainCount,
    navCount,
    headerCount,
    footerCount,
    asideCount,
  });
});





























// @ts-check

// test('Accessibility & Performance Matrix', async ({ page, browserName }) => {
  // 1. Go to the page under test
  // await page.goto('/dashboard'); // URL van pagina die wordt getest

  // 2. Accessibility: Axe-core scan
  // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  // expect(accessibilityScanResults.violations).toEqual([]);

  // 3. Accessibility: Playwright snapshot (for manual review)
  // const snapshot = await page.accessibility.snapshot();
  // Optionally: Save or log snapshot for manual review

  // 4. HTML structure checks
  // Title tag
  // const title = await page.title();
  // expect(title.length).toBeGreaterThan(0);

  // <html lang="..">
  // const lang = await page.locator('html').getAttribute('lang');
  // expect(lang).toBeTruthy();

  // Heading order (H1-H6)
  // const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
  // expect(headings.length).toBeGreaterThan(0);
  // Optionally: Check heading order logic here

  // Landmark usage: <main>, <nav>, etc.
  // const mainCount = await page.locator('main').count();
  // expect(mainCount).toBeGreaterThan(0);

  // Skip-to-content link
  // const skipLink = await page.locator('a[href^="#"], a.skip-link').first();
  // expect(await skipLink.isVisible()).toBeTruthy();

// 5. Responsive layout: Check viewport and layout
// const viewport = page.viewportSize();
// expect(viewport).not.toBeNull();
// if (viewport) {
  // expect(viewport.width).toBeGreaterThan(0);
  // expect(viewport.height).toBeGreaterThan(0);
// }

  // 6. Tap target sizes (axe-core covers this)
  // 7. Color contrast (axe-core covers this)
  // 8. ARIA usage (axe-core covers this)

  // 9. Performance: JS execution time, asset size, compression, caching
  // Use Playwright's network events
  // let totalBytes = 0;
  // let jsBytes = 0;
  // let compressedAssets = 0;
  // let cacheableAssets = 0;
  // page.on('response', async (response) => {
    // const headers = response.headers();
    // const url = response.url();
    // const size = Number(headers['content-length'] || 0);
    // totalBytes += size;
    // if (url.endsWith('.js')) jsBytes += size;
    // if (headers['content-encoding']) compressedAssets++;
    // if (headers['cache-control'] && !headers['cache-control'].includes('no-store')) cacheableAssets++;
  // });
  // Reload to trigger network events
  // await page.reload();

  // Wait for network to be idle
  // await page.waitForLoadState('networkidle');

  // 10. Lighthouse metrics (FCP, LCP, TTI, TBT, CLS)
  // Playwright does not natively run Lighthouse. You must run Lighthouse via Node.js CLI or programmatically.
  // See: https://playwright.dev/docs/performance#using-lighthouse
  // Example:
  // const { lighthouse } = require('lighthouse');
  // const { chromium } = require('playwright');
  // // Launch browser, run Lighthouse, collect metrics
  // // See Playwright docs for details
  // // You must run this outside the Playwright test context

  // 11. Manual checks for device/browser combos Playwright can't emulate
  // e.g., Samsung Internet, Silk, Smart TV browsers, etc.
  // TODO: Run these tests manually or with a different tool

  // 12. Output summary (for demo purposes)
  // console.log({
    // browser: browserName,
    // title,
    // lang,
    // totalBytes,
    // jsBytes,
    // compressedAssets,
    // cacheableAssets,
    // accessibilityViolations: accessibilityScanResults.violations.length,
  // });
// });

// Additional tests for color contrast, alt text, input labels, touch responsiveness, ARIA usage, etc.
// These are covered by axe-core, but for more granular control, write separate tests as needed.

// For touch responsiveness, you can use page.touchscreen.tap(x, y) and check for expected behavior.
// For Smart TVs, Silk, Samsung Internet, etc., Playwright does not support these browsers/devices.
// For Lighthouse, run it as a separate Node.js process and aggregate results.