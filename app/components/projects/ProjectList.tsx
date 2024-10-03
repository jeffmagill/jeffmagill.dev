
// app/coponents/projects/ProjectList.tsx
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
    const data: ProjectsData = JSON.parse(file);

    // Limit the number of projects if maxProjects is provided
    const projectsToRender = maxProjects
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
      </div>
    );
  }
}
