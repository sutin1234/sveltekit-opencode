import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../Pagination.svelte';

describe('Pagination', () => {
	const pageNumbers = [1, 2, 3, 4, 5];

	it('renders nothing when totalPages <= 1', () => {
		const { container } = render(Pagination, { currentPage: 1, totalPages: 1, pageNumbers: [1] });
		expect(container.querySelector('nav')).not.toBeInTheDocument();
	});

	it('renders navigation when totalPages > 1', () => {
		render(Pagination, { currentPage: 1, totalPages: 5, pageNumbers });
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	it('renders page number buttons', () => {
		render(Pagination, { currentPage: 1, totalPages: 5, pageNumbers });
		for (const page of pageNumbers) {
			expect(screen.getByText(String(page))).toBeInTheDocument();
		}
	});

	it('renders Previous and Next buttons', () => {
		render(Pagination, { currentPage: 1, totalPages: 5, pageNumbers });
		expect(screen.getByText('Previous')).toBeInTheDocument();
		expect(screen.getByText('Next')).toBeInTheDocument();
	});

	it('disables Previous on first page', () => {
		render(Pagination, { currentPage: 1, totalPages: 5, pageNumbers });
		expect(screen.getByText('Previous')).toBeDisabled();
	});

	it('disables Next on last page', () => {
		render(Pagination, { currentPage: 5, totalPages: 5, pageNumbers });
		expect(screen.getByText('Next')).toBeDisabled();
	});

	it('enables Previous after first page', () => {
		render(Pagination, { currentPage: 2, totalPages: 5, pageNumbers });
		expect(screen.getByText('Previous')).not.toBeDisabled();
	});

	it('enables Next before last page', () => {
		render(Pagination, { currentPage: 4, totalPages: 5, pageNumbers });
		expect(screen.getByText('Next')).not.toBeDisabled();
	});

	it('calls onpagechange with page number when clicking a page', async () => {
		const onpagechange = vi.fn();
		render(Pagination, { currentPage: 1, totalPages: 5, pageNumbers, onpagechange });

		await fireEvent.click(screen.getByText('3'));

		expect(onpagechange).toHaveBeenCalledWith(3);
	});

	it('calls onpagechange with prev page when clicking Previous', async () => {
		const onpagechange = vi.fn();
		render(Pagination, { currentPage: 3, totalPages: 5, pageNumbers, onpagechange });

		await fireEvent.click(screen.getByText('Previous'));

		expect(onpagechange).toHaveBeenCalledWith(2);
	});

	it('calls onpagechange with next page when clicking Next', async () => {
		const onpagechange = vi.fn();
		render(Pagination, { currentPage: 3, totalPages: 5, pageNumbers, onpagechange });

		await fireEvent.click(screen.getByText('Next'));

		expect(onpagechange).toHaveBeenCalledWith(4);
	});

	it('highlights current page button', () => {
		render(Pagination, { currentPage: 3, totalPages: 5, pageNumbers });
		const currentBtn = screen.getByText('3');
		expect(currentBtn.className).toContain('bg-indigo-500');
	});

	it('does not highlight other page buttons', () => {
		render(Pagination, { currentPage: 3, totalPages: 5, pageNumbers });
		const otherBtn = screen.getByText('1');
		expect(otherBtn.className).not.toContain('bg-indigo-500');
	});
});
