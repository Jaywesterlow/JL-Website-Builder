// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:5173'
  },

  projects: [
    // Desktops & Laptops
    { name: 'Dell XPS 13 - Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Dell XPS 13 - Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Dell XPS 13 - Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },

    { name: 'HP Spectre x360 - Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'HP Spectre x360 - Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'HP Spectre x360 - Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },

    { name: 'Lenovo ThinkPad T14 - Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Lenovo ThinkPad T14 - Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Lenovo ThinkPad T14 - Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },

    { name: 'Microsoft Surface Laptop 5 - Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Microsoft Surface Laptop 5 - Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Microsoft Surface Laptop 5 - Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },

    { name: 'Acer Aspire 5 - Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Acer Aspire 5 - Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Acer Aspire 5 - Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },

    { name: 'MacBook Pro (M3) - Safari', use: { ...devices['Macbook Pro 16'], browserName: 'webkit' } },
    { name: 'MacBook Pro (M3) - Chrome', use: { ...devices['Macbook Pro 16'], browserName: 'chromium' } },
    { name: 'MacBook Pro (M3) - Firefox', use: { ...devices['Macbook Pro 16'], browserName: 'firefox' } },

    { name: 'MacBook Air (M3) - Safari', use: { ...devices['Macbook Air 15'], browserName: 'webkit' } },
    { name: 'MacBook Air (M3) - Chrome', use: { ...devices['Macbook Air 15'], browserName: 'chromium' } },
    { name: 'MacBook Air (M3) - Firefox', use: { ...devices['Macbook Air 15'], browserName: 'firefox' } },

    { name: 'iMac 24" - Safari', use: { ...devices['Desktop Safari'], browserName: 'webkit' } },
    { name: 'iMac 24" - Chrome', use: { ...devices['Desktop Safari'], browserName: 'chromium' } },
    { name: 'iMac 24" - Firefox', use: { ...devices['Desktop Safari'], browserName: 'firefox' } },

    { name: 'Mac Mini (M2/M3) - Safari', use: { ...devices['Desktop Safari'], browserName: 'webkit' } },
    { name: 'Mac Mini (M2/M3) - Chrome', use: { ...devices['Desktop Safari'], browserName: 'chromium' } },
    { name: 'Mac Mini (M2/M3) - Firefox', use: { ...devices['Desktop Safari'], browserName: 'firefox' } },

    { name: 'Chromebook - Chrome', use: { ...devices['Desktop Chrome'] } },

    // Smartphones
    { name: 'iPhone 16 Pro Max - Safari', use: { ...devices['iPhone 14 Pro Max'], browserName: 'webkit' } },
    { name: 'iPhone 16 Pro Max - Chrome', use: { ...devices['iPhone 14 Pro Max'], browserName: 'webkit' } }, // Chrome on iOS uses WebKit

    { name: 'iPhone 13 - Safari', use: { ...devices['iPhone 13 Pro'], browserName: 'webkit' } },
    { name: 'iPhone 13 - Chrome', use: { ...devices['iPhone 13 Pro'], browserName: 'webkit' } },

    { name: 'iPhone SE - Safari', use: { ...devices['iPhone SE'], browserName: 'webkit' } },
    { name: 'iPhone SE - Chrome', use: { ...devices['iPhone SE'], browserName: 'webkit' } },

    { name: 'iPhone 12 Mini - Safari', use: { ...devices['iPhone 12 Mini'], browserName: 'webkit' } },
    { name: 'iPhone 12 Mini - Chrome', use: { ...devices['iPhone 12 Mini'], browserName: 'webkit' } },

    { name: 'Pixel 9 Pro - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'Pixel 9 Pro - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'Pixel 6a - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'Pixel 6a - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'Galaxy S25 Ultra - Chrome', use: { ...devices['Galaxy S9+'], browserName: 'chromium' } },
    // { name: 'Galaxy S25 Ultra - Samsung Internet', use: { ...devices['Galaxy S9+'] } }, // Not supported

    { name: 'Galaxy S25 Edge - Chrome', use: { ...devices['Galaxy S9+'], browserName: 'chromium' } },
    // { name: 'Galaxy S25 Edge - Samsung Internet', use: { ...devices['Galaxy S9+'] } }, // Not supported

    { name: 'Galaxy A14 - Chrome', use: { ...devices['Galaxy S9+'], browserName: 'chromium' } },
    // { name: 'Galaxy A14 - Samsung Internet', use: { ...devices['Galaxy S9+'] } }, // Not supported

    { name: 'OnePlus 13 - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'OnePlus 13 - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'OnePlus Nord N30 - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'OnePlus Nord N30 - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'Xiaomi 15 Ultra - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'Xiaomi 15 Ultra - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'Redmi Note 13 - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'Redmi Note 13 - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'Motorola G Power - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'Motorola G Power - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    { name: 'Nokia C32 - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },

    { name: 'Fairphone 5 - Chrome', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'Fairphone 5 - Firefox', use: { ...devices['Pixel 5'], browserName: 'firefox' } },

    // Tablets
    { name: 'iPad Pro 12.9" - Safari', use: { ...devices['iPad Pro 11'], browserName: 'webkit' } },
    { name: 'iPad Pro 12.9" - Chrome', use: { ...devices['iPad Pro 11'], browserName: 'webkit' } }, // Chrome on iOS uses WebKit

    { name: 'iPad 10th Gen - Safari', use: { ...devices['iPad (gen 7)'], browserName: 'webkit' } },
    { name: 'iPad 10th Gen - Chrome', use: { ...devices['iPad (gen 7)'], browserName: 'webkit' } },

    { name: 'iPad Mini - Safari', use: { ...devices['iPad Mini'], browserName: 'webkit' } },
    { name: 'iPad Mini - Chrome', use: { ...devices['iPad Mini'], browserName: 'webkit' } },

    { name: 'Galaxy Tab S9+ - Chrome', use: { ...devices['Galaxy Tab S4'], browserName: 'chromium' } },
    // { name: 'Galaxy Tab S9+ - Samsung Internet', use: { ...devices['Galaxy Tab S4'] } }, // Not supported

    { name: 'Lenovo Tab M10 - Chrome', use: { ...devices['Galaxy Tab S4'], browserName: 'chromium' } },
    { name: 'Lenovo Tab M10 - Firefox', use: { ...devices['Galaxy Tab S4'], browserName: 'firefox' } },

    { name: 'Amazon Fire HD 10 - Firefox', use: { ...devices['Galaxy Tab S4'], browserName: 'firefox' } },
    // { name: 'Amazon Fire HD 10 - Silk', use: { ...devices['Galaxy Tab S4'] } }, // Not supported

    // Other
    // Smart TVs, Touchscreen Laptops, Silk, Samsung Internet, Opera Mini, etc. are not supported by Playwright.
    // For these, run basic layout tests manually or with a different tool.
  ],
});