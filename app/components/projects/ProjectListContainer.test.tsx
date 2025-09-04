import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectListContainer from './ProjectListContainer';
import { vi } from 'vitest';

// Mock ProjectService
vi.mock('@/utils/projectService', () => ({
  ProjectService: {
    loadProjects: vi.fn(),
  },
}));

describe('ProjectListContainer', () => {
  test('renders projects when ProjectService.loadProjects succeeds', async () => {
    const { ProjectService } = await import('@/utils/projectService');
    // Provide a small dataset
    vi.mocked(ProjectService.loadProjects).mockResolvedValue({ projects: [{ title: 'P1' }] });

    const el = await ProjectListContainer({ file: 'x.json', maxProjects: 1 } as any);
    // Rendered result is a React element; verify it contains the project title
    const { container } = render(el as any);
    expect(container).toHaveTextContent('P1');
  });

  test('returns ErrorDisplay when loadProjects throws', async () => {
    const { ProjectService } = await import('@/utils/projectService');
    vi.mocked(ProjectService.loadProjects).mockRejectedValue(new Error('bad'));

    const el = await ProjectListContainer({ file: 'x.json', maxProjects: 1 } as any);
    const { container } = render(el as any);
    expect(container).toHaveTextContent('There was a problem loading projects.');
  });
});
// ProjectListContainer.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock the ProjectService
vi.mock('@/utils/projectService', () => ({
	ProjectService: {
		loadProjects: vi.fn(),
	},
}));

// Import the mocked ProjectService
import { ProjectService } from '@/utils/projectService';

// Mock the ErrorDisplay component
vi.mock('../global/ErrorDisplay', () => ({
	default: ({
		title,
		message,
		details,
	}: {
		title: string;
		message: string;
		details?: string;
	}) => (
		<div data-testid='error-display'>
			<h2>{title}</h2>
			<p>{message}</p>
			{details && <p>{details}</p>}
		</div>
	),
}));

// Mock the ProjectList component
vi.mock('./ProjectList', () => ({
	default: ({ projects }: { projects: any[] }) => (
		<div data-testid='project-list'>
			{projects.map((project, index) => (
				<div key={index} data-testid='project'>
					{project.title}
				</div>
			))}
		</div>
	),
}));

// Import the component to be tested
import ProjectListContainer from './ProjectListContainer';

describe('ProjectListContainer', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// Mock project data
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

	it('renders projects when data loading is successful', async () => {
		vi.mocked(ProjectService.loadProjects).mockResolvedValue(mockProjects);
		await render(await ProjectListContainer({}));

		// Verify projects are rendered
		const projectElements = await screen.findAllByTestId('project');
		expect(projectElements).toHaveLength(4);
		expect(projectElements[0]).toHaveTextContent('Project 1');
	});

	it('limits the number of projects when maxProjects is provided', async () => {
		vi.mocked(ProjectService.loadProjects).mockResolvedValue(mockProjects);
		await render(await ProjectListContainer({ maxProjects: 2 }));

		// Verify only 2 projects are rendered
		const projectElements = await screen.findAllByTestId('project');
		expect(projectElements).toHaveLength(2);
	});

	it('renders error message when service throws an error', async () => {
		vi.mocked(ProjectService.loadProjects).mockRejectedValue(
			new Error('Service error')
		);
		await render(await ProjectListContainer({}));

		// Verify error display is rendered
		expect(await screen.findByTestId('error-display')).toBeInTheDocument();
		expect(await screen.findByText('OOPSIE!')).toBeInTheDocument();
		expect(
			await screen.findByText('There was a problem loading projects.')
		).toBeInTheDocument();
		expect(await screen.findByText('Service error')).toBeInTheDocument();
	});
});
