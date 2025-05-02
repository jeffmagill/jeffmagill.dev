// ProjectListContainer.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock the 'fs' module
vi.mock('fs', () => ({
	default: {
		promises: {
			readFile: vi.fn(),
		},
	},
	promises: {
		readFile: vi.fn(),
	},
}));

// Import the mocked 'fs' module
import * as fs from 'fs';

// Mock the Project component
vi.mock('./Project', () => ({
	default: ({ title }: { title: string }) => (
		<div data-testid='project'>{title}</div>
	),
}));

// Import the component to be tested
import ProjectListContainer from './ProjectListContainer';

describe('ProjectListContainer', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// Mock the file system
	const mockProjects = {
		projects: [
			{
				title: 'Project 1',
				summary: 'Summary 1',
				description: 'Description 1',
				image: 'image1.jpg',
				tags: ['tag1'],
				created: new Date(),
			},
			{
				title: 'Project 2',
				summary: 'Summary 2',
				description: 'Description 2',
				image: 'image2.jpg',
				tags: ['tag2'],
				created: new Date(),
			},
			{
				title: 'Project 3',
				summary: 'Summary 3',
				description: 'Description 3',
				image: 'image3.jpg',
				tags: ['tag3'],
				created: new Date(),
			},
			{
				title: 'Project 4',
				summary: 'Summary 4',
				description: 'Description 4',
				image: 'image4.jpg',
				tags: ['tag4'],
				created: new Date(),
			},
		],
	};

	it('renders error message when file reading fails', async () => {
		vi.mocked(fs.promises.readFile).mockRejectedValue(
			new Error('File read error')
		);
		await render(await ProjectListContainer({}));
		expect(await screen.findByText('OOPSIE!')).toBeDefined();
		expect(
			await screen.findByText('There was a problem loading projects.')
		).toBeDefined();
	});

	it('renders error message when JSON parsing fails', async () => {
		vi.mocked(fs.promises.readFile).mockResolvedValue('Invalid JSON');
		await render(await ProjectListContainer({}));
		expect(await screen.findByText('OOPSIE!')).toBeDefined();
		expect(
			await screen.findByText('There was a problem loading projects.')
		).toBeDefined();
	});

	it('renders error message when projects array is empty', async () => {
		vi.mocked(fs.promises.readFile).mockResolvedValue(
			JSON.stringify({ projects: [] })
		);
		await render(await ProjectListContainer({}));
		expect(await screen.findByText('OOPSIE!')).toBeDefined();
		expect(
			await screen.findByText('There was a problem loading projects.')
		).toBeDefined();
	});
});
