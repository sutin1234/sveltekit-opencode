import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
	plugins: [svelte()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test-setup.ts'],
		include: ['src/**/*.test.ts'],
	},
	resolve: {
		conditions: ['browser'],
		alias: {
			$lib: path.resolve('./src/lib'),
			'$app/stores': path.resolve('./src/test-mocks/app-stores.ts'),
			'$app/navigation': path.resolve('./src/test-mocks/app-navigation.ts'),
		},
	},
});
