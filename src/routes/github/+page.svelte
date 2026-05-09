<script lang="ts">
	import { page } from '$app/stores';
	import type { PageProps } from './$types.js';
	import LoadingOverlay from '$lib/LoadingOverlay.svelte';
	import SearchInput from '$lib/SearchInput.svelte';
	import LanguageFilter from '$lib/LanguageFilter.svelte';
	import RepoCard from '$lib/RepoCard.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import { useRepos } from '$lib/useRepos.svelte.js';

	let { data }: PageProps = $props();

	const repos = useRepos(() => data.repos, () => data.totalPages);
	const currentPage = $derived(getCurrentPage());

	function getCurrentPage() {
		try {
			return Number($page.url.searchParams.get('page')) || 1;
		} catch {
			return 1;
		}
	}
</script>

<div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
	<LoadingOverlay />

	<div class="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
		<header class="mb-12 space-y-4">
			<div class="flex items-center gap-4">
				<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
					<svg class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
					</svg>
				</div>
				<div>
					<h1 class="text-3xl font-bold tracking-tight">GitHub Repositories</h1>
					<p class="text-sm text-zinc-400">Top repositories from the Svelte organization</p>
				</div>
			</div>
		</header>

		<div class="mb-8 space-y-4">
			<SearchInput bind:value={repos.searchQuery} />
			<LanguageFilter languages={repos.languages} bind:selected={repos.selectedLanguage} />
		</div>

		{#if repos.filteredRepos().length === 0}
			<div class="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-900/30 py-16">
				<svg class="mb-4 h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<p class="text-lg text-zinc-400">No repositories found</p>
				<p class="mt-1 text-sm text-zinc-500">Try adjusting your search or filters</p>
			</div>
		{:else}
			<p class="mb-6 text-sm text-zinc-500">{repos.filteredRepos().length} repository{repos.filteredRepos().length !== 1 ? 's' : ''}{#if repos.totalPages > 1} &middot; Page {currentPage} of {repos.totalPages}{/if}</p>
		{/if}

		<div class="grid gap-5 sm:grid-cols-2">
			{#each repos.filteredRepos() as repo (repo.id)}
				<RepoCard repo={repo} formatDate={repos.formatDate} />
			{/each}
		</div>

		<Pagination {currentPage} totalPages={repos.totalPages} pageNumbers={repos.pageNumbers} onpagechange={repos.goToPage} />
	</div>
</div>
