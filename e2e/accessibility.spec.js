import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility: only serious or critical violations cause failure', async ({ page }) => {
  await page.goto('/dashboard');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  const seriousViolations = accessibilityScanResults.violations.filter(v =>
    v.impact === 'serious' || v.impact === 'critical'
  );

  if (seriousViolations.length > 0) {
    console.log('Accessibility issues:', JSON.stringify(seriousViolations, null, 2));
  }

  expect(seriousViolations).toEqual([]);
});
