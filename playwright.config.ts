import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 1,
	workers: 1,
	timeout: 30000,
	expect: {
		timeout: 10000,
	},
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'bun run dev --port 5173',
		port: 5173,
		env: { VITE_MOCK_API: 'true' },
		reuseExistingServer: false,
		timeout: 30000,
	},
});
