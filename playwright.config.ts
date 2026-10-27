import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { ...devices['Desktop Chrome'] },
  webServer: [
    { command: 'npm run dev --workspace react -- --port 5173 --strictPort', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI },
    { command: 'npm run dev:angular', url: 'http://127.0.0.1:4200', reuseExistingServer: !process.env.CI, timeout: 120_000 },
  ],
});
