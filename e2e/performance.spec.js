// @ts-check
import { test, expect } from '@playwright/test';

test('Performance: JS size, compression, caching', async ({ page }) => {
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
    if (headers['cache-control'] && !headers['cache-control'].includes('no-store')) {
      cacheableAssets++;
    }
  });

  await page.goto('/dashboard');
  await page.reload();
  await page.waitForLoadState('networkidle');

  console.log({
    totalBytes,
    jsBytes,
    compressedAssets,
    cacheableAssets
  });

  expect(totalBytes).toBeGreaterThan(0); // voorbeeld: je kunt hier echte drempels instellen
});
