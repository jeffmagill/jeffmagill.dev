// layout.test.tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout from './layout';

// Mock the imported components
vi.mock('./components/global/AnalyticsWrapper', () => ({
	default: ({ children }: React.PropsWithChildren) => (
		<div data-testid='analytics-wrapper'>{children}</div>
	),
}));

vi.mock('./components/global/ErrorBoundary', () => ({
	default: ({ children }: React.PropsWithChildren) => (
		<div data-testid='error-boundary'>{children}</div>
	),
}));

vi.mock('./components/global/Header', () => ({
	default: () => <header data-testid='header'>Header Component</header>,
}));

vi.mock('./components/global/Footer', () => ({
	default: () => <footer data-testid='footer'>Footer Component</footer>,
}));

// Mock the font
vi.mock('next/font/google', () => ({
	Outfit: () => ({ className: 'mock-outfit-font' }),
}));

describe('RootLayout', () => {
	it('renders all essential layout components', () => {
		const markup = renderToStaticMarkup(
			<RootLayout>
				<div data-testid='page-content'>Page Content</div>
			</RootLayout>
		);

		const doc = new DOMParser().parseFromString(markup, 'text/html');

		// Check if all the layout components are rendered
		expect(doc.querySelector('[data-testid="analytics-wrapper"]')).toBeTruthy();
		expect(doc.querySelector('[data-testid="error-boundary"]')).toBeTruthy();
		expect(doc.querySelector('[data-testid="header"]')).toBeTruthy();
		expect(doc.querySelector('[data-testid="footer"]')).toBeTruthy();

		// Check if the children are rendered
		expect(doc.querySelector('[data-testid="page-content"]')).toBeTruthy();
		expect(doc.body.textContent).toContain('Page Content');
	});

	it('renders HTML structure with correct language', () => {
		const markup = renderToStaticMarkup(
			<RootLayout>
				<div>Content</div>
			</RootLayout>
		);
		const doc = new DOMParser().parseFromString(markup, 'text/html');
		const html = doc.querySelector('html');
		expect(html).toBeTruthy();
		expect(html?.getAttribute('lang')).toBe('en');
	});

	it('applies the font class to the body', () => {
		const markup = renderToStaticMarkup(
			<RootLayout>
				<div>Content</div>
			</RootLayout>
		);
		const doc = new DOMParser().parseFromString(markup, 'text/html');
		const body = doc.querySelector('body');
		expect(body).toBeTruthy();
		expect(body?.classList.contains('mock-outfit-font')).toBeTruthy();
	});
});
