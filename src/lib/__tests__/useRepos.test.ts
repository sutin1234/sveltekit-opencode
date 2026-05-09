import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, beforeEach } from 'vitest';
import { mockGoto } from '../../test-stores.js';
import Harness from './useRepos.harness.svelte';
import type { Repo } from '../types.js';

const repos: Repo[] = [
	{ id: 1, name: 'svelte', description: 'UI framework', html_url: '', language: 'TypeScript', stargazers_count: 1, forks_count: 1, updated_at: '', topics: ['frontend'] },
	{ id: 2, name: 'kit', description: 'App framework', html_url: '', language: 'TypeScript', stargazers_count: 2, forks_count: 2, updated_at: '', topics: ['backend'] },
	{ id: 3, name: 'rusty', description: 'A Rust tool', html_url: '', language: 'Rust', stargazers_count: 3, forks_count: 3, updated_at: '', topics: ['compiler'] },
];

beforeEach(() => {
	mockGoto.mockClear();
});

describe('useRepos', () => {
	it('shows all repos initially', () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		expect(screen.getByTestId('repo-count').textContent).toBe('3');
	});

	it('filters repos by name via search', async () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		await fireEvent.input(screen.getByTestId('search-input'), { target: { value: 'svelte' } });
		expect(screen.getByTestId('repo-count').textContent).toBe('1');
	});

	it('filters repos by description via search', async () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		await fireEvent.input(screen.getByTestId('search-input'), { target: { value: 'Rust' } });
		expect(screen.getByTestId('repo-count').textContent).toBe('1');
	});

	it('filters repos by topic via search', async () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		await fireEvent.input(screen.getByTestId('search-input'), { target: { value: 'frontend' } });
		expect(screen.getByTestId('repo-count').textContent).toBe('1');
	});

	it('filters repos by language', async () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		await fireEvent.input(screen.getByTestId('language-input'), { target: { value: 'Rust' } });
		expect(screen.getByTestId('repo-count').textContent).toBe('1');
	});

	it('combines search and language filters', async () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		await fireEvent.input(screen.getByTestId('search-input'), { target: { value: 'kit' } });
		await fireEvent.input(screen.getByTestId('language-input'), { target: { value: 'Rust' } });
		expect(screen.getByTestId('repo-count').textContent).toBe('0');
	});

	it('shows empty state when no repos match', async () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		await fireEvent.input(screen.getByTestId('search-input'), { target: { value: 'zzznonexistent' } });
		expect(screen.getByTestId('empty')).toBeInTheDocument();
	});

	it('derives languages from repo data', () => {
		render(Harness, { props: { repos, totalPages: 3 } });
		const langs = screen.getByTestId('languages').textContent!.split(',');
		expect(langs).toContain('TypeScript');
		expect(langs).toContain('Rust');
	});

	it('derives pageNumbers from totalPages', () => {
		render(Harness, { props: { repos, totalPages: 5 } });
		const pages = screen.getByTestId('pageNumbers').textContent!.split(',').map(Number);
		expect(pages).toEqual([1, 2, 3, 4, 5]);
	});

	it('renders totalPages', () => {
		render(Harness, { props: { repos, totalPages: 7 } });
		expect(screen.getByTestId('totalPages').textContent).toBe('7');
	});
});


