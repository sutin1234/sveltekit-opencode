<script lang="ts">
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	type Repo = {
		id: number;
		name: string;
		description: string | null;
		html_url: string;
		language: string | null;
		stargazers_count: number;
		forks_count: number;
	};
</script>

<div class="min-h-screen bg-gray-950 text-gray-100 p-8">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-3xl font-bold mb-8 flex items-center gap-3">
			<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
			</svg>
			GitHub Repositories
		</h1>

		<div class="grid gap-4">
			{#each data.repos as repo (repo.id)}
				<a
					href={repo.html_url}
					target="_blank"
					rel="noopener noreferrer"
					class="group block bg-gray-900 border border-gray-800 rounded-xl p-5 transition-all duration-200 hover:border-indigo-500 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-indigo-500/10"
				>
					<div class="flex items-start justify-between mb-2">
						<h2 class="text-lg font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
							{repo.name}
						</h2>
						<div class="flex items-center gap-4 text-sm text-gray-400">
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
								</svg>
								{repo.stargazers_count}
							</span>
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
								</svg>
								{repo.forks_count}
							</span>
						</div>
					</div>
					<p class="text-gray-400 text-sm mb-3 line-clamp-2">
						{repo.description ?? 'No description'}
					</p>
					{#if repo.language}
						<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
							<span class="w-2 h-2 rounded-full bg-indigo-400"></span>
							{repo.language}
						</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</div>
