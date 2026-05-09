import { writable } from 'svelte/store';
import { vi } from 'vitest';

export const mockNavigating = writable<any>(null);
export const mockGoto = vi.fn();
