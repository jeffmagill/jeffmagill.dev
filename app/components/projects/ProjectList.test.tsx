import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ProjectList from './ProjectList';
import { describe, it, expect, vi } from 'vitest';

// Mock the Modal so it renders children synchronously for tests
vi.mock('../global/Modal', () => ({
	default: ({ children }: any) => (
		<div data-testid='mock-modal'>{children}</div>
	),
}));

describe('ProjectList', () => {
	it('renders projects and opens modal on card click', async () => {
		const projects = [
			{
				title: 'P1',
				summary: 's1',
				description: 'd',
				image: '/1.jpg',
				tags: [],
			},
			{
				title: 'P2',
				summary: 's2',
				description: 'd',
				image: '/2.jpg',
				tags: [],
			},
		];

		render(<ProjectList projects={projects as any} />);

		const cards = await screen.findAllByText(/P1|P2/);
		expect(cards.length).toBeGreaterThanOrEqual(1);

		// click first card to open modal
		fireEvent.click(screen.getByText('P1'));
		// modal content should render (project title inside mocked modal)
		const modal = screen.getByTestId('mock-modal');
		expect(modal).toBeInTheDocument();
		expect(within(modal).getByText('P1')).toBeInTheDocument();
	});
});
