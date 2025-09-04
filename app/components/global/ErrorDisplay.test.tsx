import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorDisplay from './ErrorDisplay';
import { describe, it, expect } from 'vitest';

describe('ErrorDisplay', () => {
	it('renders default title and message when no props provided', () => {
		render(<ErrorDisplay />);
		expect(screen.getByText(/OOPSIE!/i)).toBeInTheDocument();
		expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
	});

	it('renders details when provided', () => {
		render(<ErrorDisplay title='Bad' message='Nope' details='more' />);
		expect(screen.getByText('Bad')).toBeInTheDocument();
		expect(screen.getByText('Nope')).toBeInTheDocument();
		expect(screen.getByText('more')).toBeInTheDocument();
	});
});
