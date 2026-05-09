<script lang="ts">
	let { currentPage = 1, totalPages = 1, pageNumbers = [] as number[], onpagechange = (_: number) => {} } = $props();
</script>

{#if totalPages > 1}
	<nav class="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
		<button
			onclick={() => onpagechange(currentPage - 1)}
			disabled={currentPage === 1}
			class="rounded-lg px-3 py-2 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:text-zinc-600 {currentPage === 1 ? 'text-zinc-600' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'}"
		>
			Previous
		</button>
		{#each pageNumbers as page}
			<button
				onclick={() => onpagechange(page)}
				class="min-w-[2.25rem] rounded-lg px-3 py-2 text-sm transition-all duration-200 {page === currentPage ? 'bg-indigo-500 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'}"
			>
				{page}
			</button>
		{/each}
		<button
			onclick={() => onpagechange(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="rounded-lg px-3 py-2 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:text-zinc-600 {currentPage === totalPages ? 'text-zinc-600' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'}"
		>
			Next
		</button>
	</nav>
{/if}
