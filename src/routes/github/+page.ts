import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://api.github.com/orgs/sveltejs/repos?sort=stars&per_page=20');
	const repos = await res.json();
	return { repos };
};
