<script lang="ts">
	import { useRepos } from '../useRepos.svelte.js';
	import type { Repo } from '../types.js';

	let { repos = [] as Repo[], totalPages = 1 }: { repos: Repo[]; totalPages: number } = $props();

	const hook = useRepos(() => repos, () => totalPages);
</script>

<div>
	<label>
		Search
		<input bind:value={hook.searchQuery} data-testid="search-input" />
	</label>
	<label>
		Language
		<input bind:value={hook.selectedLanguage} data-testid="language-input" />
	</label>

	<div data-testid="repo-count">{hook.filteredRepos().length}</div>

	{#each hook.filteredRepos() as repo}
		<div data-testid="repo-name">{repo.name}</div>
	{/each}

	{#if hook.filteredRepos().length === 0}
		<div data-testid="empty">empty</div>
	{/if}

	<div data-testid="totalPages">{hook.totalPages}</div>
	<div data-testid="pageNumbers">{hook.pageNumbers.join(',')}</div>
	<div data-testid="languages">{hook.languages.join(',')}</div>
</div>
