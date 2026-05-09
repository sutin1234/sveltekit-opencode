import '@testing-library/jest-dom/vitest';
import { mockNavigating, mockGoto } from './test-stores.js';
import { vi } from 'vitest';

vi.mock('$app/stores', () => ({
	navigating: { subscribe: mockNavigating.subscribe },
	page: { subscribe: (run: any) => { run({ url: new URL('http://localhost'), params: {} }); return () => {}; } }
}));

vi.mock('$app/navigation', () => ({
	goto: mockGoto
}));
