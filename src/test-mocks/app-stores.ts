import { writable } from 'svelte/store';
import { mockNavigating } from '../test-stores.js';
import type { Readable } from 'svelte/store';

export const navigating: Readable<any> = {
	subscribe: mockNavigating.subscribe
};

export const page: Readable<any> = {
	subscribe: (run: any) => { run({ url: new URL('http://localhost'), params: {} }); return () => {}; }
};
