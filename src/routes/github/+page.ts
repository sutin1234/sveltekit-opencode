import type { PageLoad } from './$types.js';

const MOCK_REPOS = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	name: i === 0 ? 'svelte' : `repo-${i + 1}`,
	description: i === 0 ? 'Cybernetically enhanced web apps' : `Description for repo ${i + 1}`,
	html_url: `https://github.com/sveltejs/repo-${i + 1}`,
	language: i < 10 ? 'TypeScript' : i < 20 ? 'JavaScript' : 'Rust',
	stargazers_count: 1000 - i * 10,
	forks_count: 500 - i * 5,
	updated_at: '2025-12-01T00:00:00Z',
	topics: i === 0 ? ['frontend', 'compiler', 'ui'] : [`topic-${i}`],
}));

export const load: PageLoad = async ({ fetch, url }) => {
	const page = url.searchParams.get('page') || '1';

	if (import.meta.env.VITE_MOCK_API === 'true') {
		const pageNum = parseInt(page);
		const perPage = 10;
		const start = (pageNum - 1) * perPage;
		const repos = MOCK_REPOS.slice(start, start + perPage);
		const totalPages = Math.ceil(MOCK_REPOS.length / perPage);
		return { repos, totalPages };
	}

	const res = await fetch(`https://api.github.com/orgs/sveltejs/repos?sort=stars&per_page=10&page=${page}&type=public`);

	if (!res.ok) return { repos: [], totalPages: 0 };

	const repos = await res.json();

	let totalPages = 1;
	try {
		const linkHeader = res.headers.get('Link');
		if (linkHeader) {
			const lastMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
			if (lastMatch) totalPages = parseInt(lastMatch[1]);
		}
	} catch {
		// Link header not available
	}

	return { repos, totalPages };
};