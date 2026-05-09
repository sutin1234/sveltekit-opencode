import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import LanguageFilter from '../LanguageFilter.svelte';

describe('LanguageFilter', () => {
	const languages = ['TypeScript', 'JavaScript', 'Python'];

	it('renders All button', () => {
		render(LanguageFilter, { languages });
		expect(screen.getByText('All')).toBeInTheDocument();
	});

	it('renders language buttons', () => {
		render(LanguageFilter, { languages });
		for (const lang of languages) {
			expect(screen.getByText(lang)).toBeInTheDocument();
		}
	});

	it('highlights All when selected is empty', () => {
		render(LanguageFilter, { languages, selected: '' });
		const allBtn = screen.getByText('All');
		expect(allBtn.className).toContain('bg-indigo-500');
	});

	it('highlights selected language', () => {
		render(LanguageFilter, { languages, selected: 'TypeScript' });
		const tsBtn = screen.getByText('TypeScript');
		expect(tsBtn.className).toContain('bg-indigo-500');
	});

	it('calls onselectedchange when clicking a language', async () => {
		const { component } = render(LanguageFilter, { languages });

		await fireEvent.click(screen.getByText('JavaScript'));

		const jsBtn = screen.getByText('JavaScript');
		expect(jsBtn.className).toContain('bg-indigo-500');
	});

	it('deselects when clicking selected language', async () => {
		render(LanguageFilter, { languages, selected: 'TypeScript' });

		await fireEvent.click(screen.getByText('TypeScript'));

		const tsBtn = screen.getByText('TypeScript');
		expect(tsBtn.className).not.toContain('bg-indigo-500');
	});

	it('resets to All when clicking All button', async () => {
		render(LanguageFilter, { languages, selected: 'TypeScript' });

		await fireEvent.click(screen.getByText('All'));

		const allBtn = screen.getByText('All');
		expect(allBtn.className).toContain('bg-indigo-500');
	});
});
