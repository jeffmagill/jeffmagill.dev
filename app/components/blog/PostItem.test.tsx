import React from 'react';
import { render, screen } from '@testing-library/react';
import PostItem from './PostItem';
import { describe, test, expect } from 'vitest';

describe('PostItem', () => {
	test('renders post details and tags when tags is a string', () => {
		const post = {
			title: 'T1',
			description: 'D1',
			content: 'C1',
			image: '/img.jpg',
			tags: 'tag1, tag2',
			slug: 't1',
		} as any;

		render(<PostItem post={post} />);

		expect(screen.getByText('T1')).toBeInTheDocument();
		expect(screen.getByText('D1')).toBeInTheDocument();
		// Tags rendered as a single list item when provided as a string
		expect(screen.getByText('tag1, tag2')).toBeInTheDocument();
		// Link href should contain the slug
		const link = screen.getByRole('link') as HTMLAnchorElement;
		expect(link.getAttribute('href') || '').toContain('/post/t1');
	});

	test('renders tags when tags is an array', () => {
		const post = {
			title: 'T2',
			description: 'D2',
			content: 'C2',
			image: '/img2.jpg',
			tags: ['a', 'b'],
			slug: 't2',
		} as any;

		render(<PostItem post={post} />);
		expect(screen.getByText('a')).toBeInTheDocument();
		expect(screen.getByText('b')).toBeInTheDocument();
	});
});
