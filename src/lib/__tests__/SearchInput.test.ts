import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import SearchInput from '../SearchInput.svelte';

describe('SearchInput', () => {
	it('renders input with placeholder', () => {
		render(SearchInput);
		const input = screen.getByPlaceholderText('Search repositories...');
		expect(input).toBeInTheDocument();
	});

	it('renders search icon', () => {
		const { container } = render(SearchInput);
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	it('updates value on input', async () => {
		const { component } = render(SearchInput, { value: '' });
		const input = screen.getByPlaceholderText('Search repositories...');

		await fireEvent.input(input, { target: { value: 'svelte' } });

		expect((input as HTMLInputElement).value).toBe('svelte');
	});

	it('reflects initial value prop', () => {
		render(SearchInput, { value: 'initial' });
		const input = screen.getByPlaceholderText('Search repositories...');
		expect((input as HTMLInputElement).value).toBe('initial');
	});
});
