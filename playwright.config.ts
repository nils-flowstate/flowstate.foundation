import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  reporter: [['list'], ['json', { outputFile: 'test-results/ergebnis.json' }]],
  use: {
    baseURL: 'http://localhost:4321',
    launchOptions: { executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] },
  },
  webServer: { command: 'pnpm preview', url: 'http://localhost:4321', reuseExistingServer: true, timeout: 60000 },
});
