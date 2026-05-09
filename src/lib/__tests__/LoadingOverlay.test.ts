import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import LoadingOverlay from '../LoadingOverlay.svelte';
import { mockNavigating } from '../../test-stores.js';

describe('LoadingOverlay', () => {
	it('is hidden when not navigating', () => {
		mockNavigating.set(null);
		render(LoadingOverlay);
		expect(screen.queryByText('Loading repositories...')).not.toBeInTheDocument();
	});

	it('shows loading indicator when navigating', async () => {
		mockNavigating.set({ from: null, to: { url: new URL('http://localhost/page/2') } });
		render(LoadingOverlay);
		await waitFor(() => {
			expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
		});
	});

	it('hides after navigation completes', async () => {
		mockNavigating.set({ from: null, to: { url: new URL('http://localhost/page/2') } });
		render(LoadingOverlay);
		await waitFor(() => {
			expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
		});

		mockNavigating.set(null);
		await waitFor(() => {
			expect(screen.queryByText('Loading repositories...')).not.toBeInTheDocument();
		});
	});
});
