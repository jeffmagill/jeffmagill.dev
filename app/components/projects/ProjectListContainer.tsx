import { Suspense } from 'react';
import ProjectList from './ProjectList';
import ErrorDisplay from '../global/ErrorDisplay';
import { ProjectService } from '@/utils/projectService';
import { ProjectListContainerProps } from '@/utils/types';

/**
 * Container component that handles loading project data and error states
 */
export default async function ProjectListContainer({
	file = '',
	maxProjects = 0,
}: ProjectListContainerProps): Promise<JSX.Element> {
	try {
		// Use the ProjectService to load the projects
		const data = await ProjectService.loadProjects(file);

		// Limit the number of projects if maxProjects is provided
		const projectsToRender =
			maxProjects > 0 ? data.projects.slice(0, maxProjects) : data.projects;

		// Render the ProjectList with the filtered projects
		return (
			<Suspense fallback={<div>Loading projects...</div>}>
				<ProjectList projects={projectsToRender} />
			</Suspense>
		);
	} catch (error) {
		// Use the ErrorDisplay component for error handling
		return (
			<ErrorDisplay
				title='OOPSIE!'
				message='There was a problem loading projects.'
				details={(error as Error).message}
			/>
		);
	}
}
