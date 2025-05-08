// Footer.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import styles from './Footer.module.scss';

// Mock the Navigation component
vi.mock('./Navigation', () => ({
	default: () => <nav data-testid='navigation'>Navigation Component</nav>,
}));

// Mock the settings import
vi.mock('@/utils/settings.mjs', () => ({
	settings: {
		title: 'Andrew Magill | Developer',
	},
}));

describe('Footer', () => {
	const originalDate = global.Date;
	const mockDate = new Date('2025-05-08T12:00:00Z');

	beforeEach(() => {
		// Mock the Date constructor to return a consistent date
		global.Date = class extends Date {
			constructor() {
				super();
				return mockDate;
			}
		} as DateConstructor;
	});

	afterEach(() => {
		// Restore the original Date constructor
		global.Date = originalDate;
	});

	it('renders Navigation component', () => {
		render(<Footer />);
		expect(screen.getByTestId('navigation')).toBeInTheDocument();
	});

	it('displays copyright information with current year', () => {
		render(<Footer />);
		expect(screen.getByText(/Copyright © 2025/)).toBeInTheDocument();
		expect(screen.getByText(/Andrew Magill \| Developer/)).toBeInTheDocument();
	});

	it('has correct styling', () => {
		const { container } = render(<Footer />);
		const footer = container.querySelector('footer');
		expect(footer).toHaveClass(styles.footer);

		const wrapper = container.querySelector('div');
		expect(wrapper).toHaveClass(styles.wrapper);
	});
});
