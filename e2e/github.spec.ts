import { test, expect } from '@playwright/test';

const MOCK_REPOS = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	name: i === 0 ? 'svelte' : `repo-${i + 1}`,
	description: i === 0 ? 'Cybernetically enhanced web apps' : `Description for repo ${i + 1}`,
	html_url: `https://github.com/sveltejs/repo-${i + 1}`,
	language: i < 10 ? 'TypeScript' : i < 20 ? 'JavaScript' : 'Rust',
	stargazers_count: 1000 - i * 10,
	forks_count: 500 - i * 5,
	updated_at: '2025-12-01T00:00:00Z',
	topics: i === 0 ? ['frontend', 'compiler', 'ui'] : [`topic-${i}`],
}));

function setupApiMock(page: import('@playwright/test').Page) {
	return page.route('**/api.github.com/**', async (route) => {
		const url = new URL(route.request().url());
		const pageNum = parseInt(url.searchParams.get('page') || '1');
		const perPage = 10;
		const start = (pageNum - 1) * perPage;
		const repos = MOCK_REPOS.slice(start, start + perPage);
		const totalPages = Math.ceil(MOCK_REPOS.length / perPage);

		let linkHeader = '';
		if (pageNum < totalPages) {
			linkHeader += `<https://api.github.com/orgs/sveltejs/repos?page=${pageNum + 1}&per_page=${perPage}>; rel="next", `;
		}
		if (pageNum > 1) {
			linkHeader += `<https://api.github.com/orgs/sveltejs/repos?page=${pageNum - 1}&per_page=${perPage}>; rel="prev", `;
		}
		linkHeader += `<https://api.github.com/orgs/sveltejs/repos?page=${totalPages}&per_page=${perPage}>; rel="last"`;

		await route.fulfill({
			status: 200,
			headers: { Link: linkHeader, 'Content-Type': 'application/json' },
			body: JSON.stringify(repos),
		});
	});
}

test.describe('GitHub Repos Page', () => {
	test.beforeEach(async ({ page }) => {
		await setupApiMock(page);
		await page.goto('/github');
		await page.waitForLoadState('networkidle');
	});

	test('page loads with title and search input', async ({ page }) => {
		await expect(page.getByText('GitHub Repositories')).toBeVisible();
		await expect(page.getByPlaceholder('Search repositories...')).toBeVisible();
	});

	test('shows repo cards', async ({ page }) => {
		const cards = page.locator('a[target="_blank"]');
		await expect(cards.first()).toBeVisible({ timeout: 15000 });
		expect(await cards.count()).toBeGreaterThan(0);
	});

	test('shows language filter pills', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
		const pills = page.locator('button').filter({ hasText: /./ }).filter({ hasText: /TypeScript|JavaScript|Rust/ });
		const count = await pills.count();
		expect(count).toBeGreaterThanOrEqual(1);
	});

	test('filters repos by search query', async ({ page }) => {
		await page.getByPlaceholder('Search repositories...').fill('svelte');
		await page.waitForTimeout(500);
		const cards = page.locator('a[target="_blank"]');
		expect(await cards.count()).toBe(1);
	});

	test('filters repos by description via search', async ({ page }) => {
		await page.getByPlaceholder('Search repositories...').fill('Cybernetically');
		await page.waitForTimeout(500);
		expect(await page.locator('a[target="_blank"]').count()).toBe(1);
	});

	test('filters repos by topic via search', async ({ page }) => {
		await page.getByPlaceholder('Search repositories...').fill('frontend');
		await page.waitForTimeout(500);
		expect(await page.locator('a[target="_blank"]').count()).toBe(1);
	});

	test('shows empty state when no repos match', async ({ page }) => {
		await page.getByPlaceholder('Search repositories...').fill('zzznonexistent');
		await page.waitForTimeout(500);
		await expect(page.getByText('No repositories found')).toBeVisible();
		await expect(page.getByText('Try adjusting your search or filters')).toBeVisible();
	});

	test('shows pagination', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Pagination"]');
		await expect(nav).toBeVisible({ timeout: 15000 });
	});

	test('pagination: Previous disabled on page 1', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Pagination"]');
		await expect(nav).toBeVisible({ timeout: 15000 });
		await expect(nav.getByText('Previous')).toBeDisabled();
		await expect(nav.getByText('Next')).toBeEnabled();
	});

	test('pagination: Next navigates to page 2', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Pagination"]');
		await expect(nav).toBeVisible({ timeout: 15000 });

		await nav.getByText('Next').click();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(/\?page=2/);
		await expect(page.locator('a[target="_blank"]').first()).toBeVisible();
	});

	test('pagination: Previous navigates back to page 1', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Pagination"]');
		await expect(nav).toBeVisible({ timeout: 15000 });

		await nav.getByText('Next').click();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(/\?page=2/);

		await nav.getByText('Previous').click();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(/\/github(\?page=1)?$/);
	});

	test('pagination: click page 3 shows 5 repos', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Pagination"]');
		await expect(nav).toBeVisible({ timeout: 15000 });

		await page.getByRole('button', { name: '3' }).click();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(/\?page=3/);
		expect(await page.locator('a[target="_blank"]').count()).toBe(5);
	});

	test('repo card has correct attributes', async ({ page }) => {
		const card = page.locator('a[target="_blank"]').first();
		await expect(card).toBeVisible({ timeout: 15000 });
		await expect(card).toHaveAttribute('target', '_blank');
		await expect(card).toHaveAttribute('rel', 'noopener noreferrer');
		await expect(card.locator('h2')).toBeVisible();
		await expect(card.locator('p.line-clamp-2')).toBeVisible();
		await expect(card.locator('span.tabular-nums').first()).toBeVisible();
	});
});
