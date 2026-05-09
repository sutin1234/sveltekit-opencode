<script lang="ts">
	import { navigating } from '$app/stores';
</script>

{#if $navigating}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
		<div class="flex flex-col items-center gap-4">
			<div class="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500"></div>
			<p class="text-sm text-zinc-400">Loading repositories...</p>
		</div>
	</div>
{/if}
