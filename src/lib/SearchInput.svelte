<script lang="ts">
	let { value = $bindable('') } = $props();
</script>

<div class="relative">
	<svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
		<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
	</svg>
	<input
		type="text"
		bind:value
		placeholder="Search repositories..."
		class="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 transition-all duration-200 focus:border-indigo-500/50 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
	/>
</div>
