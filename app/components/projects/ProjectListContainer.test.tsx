import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';

// Mock the ProjectService module
vi.mock('@/utils/projectService', () => ({
	ProjectService: {
		loadProjects: vi.fn(),
	},
}));

import { ProjectService } from '@/utils/projectService';

// Mock ErrorDisplay and ProjectList to simplify assertions
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

vi.mock('./ProjectList', () => ({
	default: ({ projects }: { projects: any[] }) => (
		<div data-testid='project-list'>
			{projects.map((project: any, index: number) => (
				<div key={index} data-testid='project'>
					{project.title}
				</div>
			))}
		</div>
	),
}));

import ProjectListContainer from './ProjectListContainer';

describe('ProjectListContainer', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	const mockProjects = {
		projects: [
			{
				title: 'Project 1',
				summary: 's',
				description: 'd',
				image: '',
				tags: [],
				created: new Date(),
			},
			{
				title: 'Project 2',
				summary: 's',
				description: 'd',
				image: '',
				tags: [],
				created: new Date(),
			},
			{
				title: 'Project 3',
				summary: 's',
				description: 'd',
				image: '',
				tags: [],
				created: new Date(),
			},
			{
				title: 'Project 4',
				summary: 's',
				description: 'd',
				image: '',
				tags: [],
				created: new Date(),
			},
		],
	} as any;

	it('renders projects when data loading is successful', async () => {
		vi.mocked(ProjectService.loadProjects).mockResolvedValue(mockProjects);
		await render(await ProjectListContainer({} as any));
		const projectElements = await screen.findAllByTestId('project');
		expect(projectElements).toHaveLength(4);
		expect(projectElements[0]).toHaveTextContent('Project 1');
	});

	it('limits the number of projects when maxProjects is provided', async () => {
		vi.mocked(ProjectService.loadProjects).mockResolvedValue(mockProjects);
		await render(await ProjectListContainer({ maxProjects: 2 } as any));
		const projectElements = await screen.findAllByTestId('project');
		expect(projectElements).toHaveLength(2);
	});

	it('renders error message when service throws an error', async () => {
		vi.mocked(ProjectService.loadProjects).mockRejectedValue(
			new Error('Service error')
		);
		await render(await ProjectListContainer({} as any));
		expect(await screen.findByTestId('error-display')).toBeInTheDocument();
		expect(await screen.findByText('OOPSIE!')).toBeInTheDocument();
		expect(
			await screen.findByText('There was a problem loading projects.')
		).toBeInTheDocument();
		expect(await screen.findByText('Service error')).toBeInTheDocument();
	});
});
