// app/components/projects/ProjectList.tsx
import { promises as fs } from 'fs';
import Project from './Project';
import styles from './ProjectList.module.scss';

interface Project {
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  created: Date;
}

interface ProjectsData {
  projects: Project[];
}

interface ProjectListProps {
  maxProjects?: number;
}

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectList({
  maxProjects = 0,
}: ProjectListProps): Promise<JSX.Element> {
  try {
    // Read the JSON file
    const fileName = process.cwd() + '/content/projects.json';
    const file = await fs.readFile(fileName, 'utf8');
    console.log('File: "' + fileName + '" loaded. 98798');
    // Check if file content is empty or undefined
    if (!file) {
      throw new Error('File: "' + fileName + '" was not loaded. 12414');
    }

    const data: ProjectsData = JSON.parse(file);

    // Check if projects array exists and is not empty
    if (!data.projects || data.projects.length === 0) {
      throw new Error('No projects found in the JSON file');
    }

    // Limit the number of projects if maxProjects is provided
    const projectsToRender = maxProjects > 0
      ? data.projects.slice(0, maxProjects)
      : data.projects;

    return (
      <section className={styles.projectsContainer}>
        <div className={styles.projectsGrid}>
          {projectsToRender.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error reading or parsing JSON:', error);
    return (
      <div style={{ textAlign: 'center', margin: '2rem' }}>
        <h2>OOPSIE!</h2>
        <p className='center error'>There was a problem loading projects. </p>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
