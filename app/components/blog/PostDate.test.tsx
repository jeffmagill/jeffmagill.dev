import React from 'react';
import { render, screen } from '@testing-library/react';
import PostDate from './PostDate';
import { vi, describe, afterEach, test, expect } from 'vitest';

describe('PostDate', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	test('renders Published on for created timestamp', () => {
		// 2021-01-01 UTC in seconds
		const created = '1609459200';
		render(<PostDate created={created} />);
		expect(screen.getByText(/Published on/i)).toBeInTheDocument();
		// The formatted date should be January 1, 2021
		expect(screen.getByText(/January 1, 2021/)).toBeInTheDocument();
		const time = screen.getByRole('time') as HTMLElement | null;
		// If role not present, find time element
		const timeEl = time ?? screen.getByText(/January 1, 2021/).closest('time');
		expect(timeEl).toHaveAttribute('dateTime', created);
	});

	test('renders Updated on when lastUpdated is newer than created', () => {
		// created: Jan 1 2021, lastUpdated: Feb 1 2021
		const created = '1609459200';
		const lastUpdated = '1612137600';
		render(<PostDate created={created} lastUpdated={lastUpdated} />);
		expect(screen.getByText(/Updated on/i)).toBeInTheDocument();
		expect(screen.getByText(/February 1, 2021/)).toBeInTheDocument();
		const timeEl = screen.getByText(/February 1, 2021/).closest('time');
		expect(timeEl).toHaveAttribute('dateTime', lastUpdated);
	});

	test('falls back to current date when created is missing', () => {
		// Set system time so we can assert the fallback
		const fixed = new Date('2020-01-01T00:00:00.000Z');
		vi.useFakeTimers();
		vi.setSystemTime(fixed);

		render(<PostDate created={'' as any} />);
		expect(screen.getByText(/Published on/i)).toBeInTheDocument();
		expect(screen.getByText(/January 1, 2020/)).toBeInTheDocument();
		const timeEl = screen.getByText(/January 1, 2020/).closest('time');
		// dateTime should start with the ISO date for our fixed time
		expect(
			timeEl?.getAttribute('dateTime')?.startsWith('2020-01-01')
		).toBeTruthy();
	});
});
