import { promises as fs } from 'fs';
import { ProjectsData } from './types';

/**
 * Service responsible for loading project data from JSON files
 */
export class ProjectService {
	/**
	 * Load projects from a specified JSON file
	 * @param fileSuffix Optional suffix for the projects file name
	 * @returns Promise with the projects data
	 */
	static async loadProjects(fileSuffix: string = ''): Promise<ProjectsData> {
		try {
			// Read the JSON file
			const fileName =
				process.cwd() + '/content/projects' + fileSuffix + '.json';
			const fileContent = await fs.readFile(fileName, 'utf8');

			// Check if file content is empty
			if (!fileContent) {
				throw new Error(`File: "${fileName}" was not loaded.`);
			}

			const data: ProjectsData = JSON.parse(fileContent);

			// Check if projects array exists and is not empty
			if (!data.projects || data.projects.length === 0) {
				throw new Error('No projects found in the JSON file');
			}

			return data;
		} catch (error) {
			console.error('Error loading projects:', error);
			throw error;
		}
	}
}
