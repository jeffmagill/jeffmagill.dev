// NavButton.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavButton from './NavButton';

// Setup variables for mocking
const usePathnameMock = vi.fn();

// Mock next/navigation
vi.mock('next/navigation', () => ({
	usePathname: () => usePathnameMock(),
}));

// Mock FontAwesome
vi.mock('@fortawesome/react-fontawesome', () => ({
	FontAwesomeIcon: ({ icon }: { icon: unknown }) => (
		<span data-testid='font-awesome-icon'>Icon Mock</span>
	),
}));

vi.mock('@fortawesome/free-solid-svg-icons', () => ({
	faBars: {},
}));

describe('NavButton', () => {
	// Mock document functions
	const mockHeaderElement = {
		style: {
			setProperty: vi.fn(),
		},
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	};

	beforeEach(() => {
		vi.resetAllMocks();
		// Set default pathname mock
		usePathnameMock.mockReturnValue('/');
		// Mock getElementById
		document.getElementById = vi.fn().mockReturnValue(mockHeaderElement);
	});

	it('renders checkbox input with correct class and icon', () => {
		render(<NavButton />);

		// Verify checkbox exists
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute('id', 'navButton');

		// Verify FontAwesome icon is rendered
		const icon = screen.getByTestId('font-awesome-icon');
		expect(icon).toBeInTheDocument();
	});

	it('adds and removes event listeners on mount and unmount', () => {
		const { unmount } = render(<NavButton />);

		// Check if event listener was added on mount
		expect(mockHeaderElement.addEventListener).toHaveBeenCalledWith(
			'click',
			expect.any(Function)
		);

		// Unmount component
		unmount();

		// Check if event listener was removed on unmount
		expect(mockHeaderElement.removeEventListener).toHaveBeenCalledWith(
			'click',
			expect.any(Function)
		);
	});

	it('handles path change and resets checkbox', () => {
		render(<NavButton />);

		// Change the mock to return a different path
		usePathnameMock.mockReturnValue('/blog');

		// Force a re-render by unmounting and remounting
		const { rerender } = render(<NavButton />);
		rerender(<NavButton />);

		// Check if header style was reset
		expect(mockHeaderElement.style.setProperty).toHaveBeenCalledWith(
			'--header-space',
			''
		);
	});
});
