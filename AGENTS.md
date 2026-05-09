# Project Guide

## Tech Stack
- **Framework**: SvelteKit v2 + Svelte 5 (runes mode)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Package Manager**: bun

## Commands
```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview production build
bun run check        # Type-check (svelte-check)
bun run check:watch  # Type-check in watch mode
```

## Project Structure
```
src/
  lib/
    components/       # Reusable UI components
    use*.svelte.ts    # Custom hooks (logic extracted from components)
    types.ts          # Shared TypeScript types
  routes/
    +layout.svelte    # Root layout
    +page.svelte      # Home page
    github/
      +page.ts        # Page load function (data fetching)
      +page.svelte    # Page component
+page.server.ts       # Server-only load function
+page.ts              # Universal load function (runs on server + client)
hooks.server.ts       # Server hooks (handle, handleError, etc.)
```

## Code Conventions

### Svelte 5 Runes
- `$props()` — declare component props
- `$state()` — local reactive state
- `$derived()` — computed values
- `$effect()` — side effects (runs after render)
- `$bindable()` — two-way bindable prop in child components
- `untrack()` — read reactive value without creating dependency

### Component Pattern
```svelte
<script lang="ts">
  let { prop1, prop2 }: { prop1: string; prop2: number } = $props();
  let localState = $state('');
  const computed = $derived(localState + prop1);
</script>
```

For components with `bind:` support:
```svelte
<script lang="ts">
  let { value = $bindable('') } = $props();
</script>
<input bind:value />
```

### Custom Hook Pattern
Extract logic into `src/lib/*.svelte.ts`. Use getter functions for reactive data from the parent:

```ts
// src/lib/useThing.svelte.ts
export function useThing(getData: () => DataType) {
  const data = $derived(getData());
  let state = $state('');

  $effect(() => {
    state; // dependency
    // side effect
  });

  return {
    get state() { return state },  // getter/setter for bind: support
    set state(v) { state = v },
    data,
  };
}
```

Usage in component:
```svelte
<script lang="ts">
  const thing = useThing(() => data.someField);
</script>
<input bind:value={thing.state} />
```

### Store Access
- Use `$storeName` auto-subscription only in `.svelte` files
- In `.svelte.ts` files, use `get(store)` for one-time reads or pass values via props/getters

### Data Fetching
- Use `+page.ts` (universal load) for data fetching from APIs
- SvelteKit re-runs `load` on client-side navigation (`goto`)
- Use `+page.server.ts` for server-only logic (secrets, DB access)
- Server `fetch` requires `filterSerializedResponseHeaders` in `hooks.server.ts` for custom headers

### Styling
- Tailwind CSS v4 with utility classes
- Dark theme base: `bg-zinc-950 text-zinc-100`
- Color accent: `indigo-500`
- Use `animate-pulse` for skeleton loading states

### Pagination
- Page number from URL query param: `?page=N`
- Navigation via `goto()` from `$app/navigation`
- Loading state via `$navigating` store
- API returns total pages via `Link` header (`rel="last"`)

### Imports
- Use `$lib/` alias for `src/lib/`
- Use relative imports for same-directory files
