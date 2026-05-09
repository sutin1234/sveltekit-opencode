<script lang="ts">
	import type { Repo } from './types.js';

	let { repo, formatDate }: { repo: Repo; formatDate: (date: string) => string } = $props();
</script>

<a
	href={repo.html_url}
	target="_blank"
	rel="noopener noreferrer"
	class="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5"
>
	<div class="mb-4 flex items-start justify-between gap-4">
		<div class="flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50">
				<svg class="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
				</svg>
			</div>
			<div>
				<h2 class="text-base font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors">
					{repo.name}
				</h2>
				{#if repo.updated_at}
					<p class="text-xs text-zinc-500">Updated {formatDate(repo.updated_at)}</p>
				{/if}
			</div>
		</div>
		<div class="flex gap-4 text-xs text-zinc-500">
			<span class="flex items-center gap-1">
				<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
				</svg>
				<span class="tabular-nums">{repo.stargazers_count}</span>
			</span>
			<span class="flex items-center gap-1">
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
				</svg>
				<span class="tabular-nums">{repo.forks_count}</span>
			</span>
		</div>
	</div>

	<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">
		{repo.description ?? 'No description available'}
	</p>

	<div class="flex flex-wrap items-center gap-2">
		{#if repo.language}
			<span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-400 ring-1 ring-indigo-500/20">
				<span class="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
				{repo.language}
			</span>
		{/if}
		{#if repo.topics && repo.topics.length > 0}
			{#each repo.topics.slice(0, 3) as topic}
				<span class="inline-flex items-center rounded-full bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-400">
					{topic}
				</span>
			{/each}
		{/if}
	</div>

	<div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
</a>
