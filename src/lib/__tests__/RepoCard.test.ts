import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import RepoCard from '../RepoCard.svelte';
import type { Repo } from '../types.js';

const mockRepo: Repo = {
	id: 1,
	name: 'svelte',
	description: 'Cybernetically enhanced web apps',
	html_url: 'https://github.com/sveltejs/svelte',
	language: 'TypeScript',
	stargazers_count: 85000,
	forks_count: 4200,
	updated_at: '2025-12-01T00:00:00Z',
	topics: ['javascript', 'compiler', 'ui']
};

function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short', day: 'numeric', year: 'numeric'
	});
}

describe('RepoCard', () => {
	it('renders repo name', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		expect(screen.getByText('svelte')).toBeInTheDocument();
	});

	it('renders description', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		expect(screen.getByText('Cybernetically enhanced web apps')).toBeInTheDocument();
	});

	it('shows fallback text when description is null', () => {
		const repo = { ...mockRepo, description: null };
		render(RepoCard, { repo, formatDate });
		expect(screen.getByText('No description available')).toBeInTheDocument();
	});

	it('links to repo URL with target="_blank"', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', 'https://github.com/sveltejs/svelte');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('renders star count', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		expect(screen.getByText('85000')).toBeInTheDocument();
	});

	it('renders fork count', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		expect(screen.getByText('4200')).toBeInTheDocument();
	});

	it('renders language badge', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		expect(screen.getByText('TypeScript')).toBeInTheDocument();
	});

	it('does not render language badge when language is null', () => {
		const repo = { ...mockRepo, language: null };
		render(RepoCard, { repo, formatDate });
		expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
	});

	it('renders topic badges (max 3)', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		expect(screen.getByText('javascript')).toBeInTheDocument();
		expect(screen.getByText('compiler')).toBeInTheDocument();
		expect(screen.getByText('ui')).toBeInTheDocument();
	});

	it('renders max 3 topics', () => {
		const repo = {
			...mockRepo,
			topics: ['a', 'b', 'c', 'd', 'e']
		};
		render(RepoCard, { repo, formatDate });
		expect(screen.getByText('a')).toBeInTheDocument();
		expect(screen.getByText('b')).toBeInTheDocument();
		expect(screen.getByText('c')).toBeInTheDocument();
		expect(screen.queryByText('d')).not.toBeInTheDocument();
		expect(screen.queryByText('e')).not.toBeInTheDocument();
	});

	it('renders formatted updated date', () => {
		render(RepoCard, { repo: mockRepo, formatDate });
		const expectedDate = formatDate(mockRepo.updated_at);
		expect(screen.getByText(`Updated ${expectedDate}`)).toBeInTheDocument();
	});

	it('does not render date when updated_at is missing', () => {
		const repo = { ...mockRepo, updated_at: '' };
		render(RepoCard, { repo, formatDate });
		expect(screen.queryByText(/Updated/)).not.toBeInTheDocument();
	});
});
