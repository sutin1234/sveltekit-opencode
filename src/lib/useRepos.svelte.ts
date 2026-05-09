import { goto } from '$app/navigation';
import type { Repo } from './types.js';

export function useRepos(
	getRepos: () => Repo[],
	getTotalPages: () => number
) {
	const repos = $derived(getRepos());
	const totalPages = $derived(getTotalPages());

	let searchQuery = $state('');
	let selectedLanguage = $state('');

	const languages = $derived(
		[...new Set(repos.map((r: Repo) => r.language).filter(Boolean))] as string[]
	);

	const filteredRepos = $derived(() => {
		const query = searchQuery.toLowerCase();
		return repos.filter((repo: Repo) => {
			const matchesSearch = !query ||
				repo.name.toLowerCase().includes(query) ||
				repo.description?.toLowerCase().includes(query) ||
				repo.topics?.some((t: string) => t.toLowerCase().includes(query));

			const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;

			return matchesSearch && matchesLanguage;
		});
	});

	const pageNumbers = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));

	let firstRun = true;

	$effect(() => {
		searchQuery;
		selectedLanguage;
		if (firstRun) {
			firstRun = false;
			return;
		}
		goto('?page=1', { replaceState: true });
	});

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function goToPage(p: number) {
		goto(`?page=${p}`);
	}

	return {
		get searchQuery() { return searchQuery },
		set searchQuery(v: string) { searchQuery = v },
		get selectedLanguage() { return selectedLanguage },
		set selectedLanguage(v: string) { selectedLanguage = v },
		get languages() { return languages },
		get filteredRepos() { return filteredRepos },
		get totalPages() { return totalPages },
		get pageNumbers() { return pageNumbers },
		formatDate,
		goToPage
	};
}
