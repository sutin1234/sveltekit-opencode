<script lang="ts">
	let { languages = [], selected = $bindable('') } = $props();
</script>

<div class="flex flex-wrap gap-2">
	<button
		onclick={() => selected = ''}
		class="rounded-full px-4 py-1.5 text-sm transition-all duration-200 {selected === '' ? 'bg-indigo-500 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'}"
	>
		All
	</button>
	{#each languages as lang}
		<button
			onclick={() => selected = selected === lang ? '' : lang}
			class="rounded-full px-4 py-1.5 text-sm transition-all duration-200 {selected === lang ? 'bg-indigo-500 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'}"
		>
			{lang}
		</button>
	{/each}
</div>
