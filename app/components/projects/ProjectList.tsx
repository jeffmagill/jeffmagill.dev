import { useState } from 'react';
import ProjectComponent from './Project'; // Renamed import
import Modal from '../global/Modal';
import Image from 'next/image';
import styles from './ProjectList.module.scss';
import { promises as fs } from 'fs';
import ClientProjectList from './ClientProjectList';
import { Project, ProjectsData, ProjectListProps } from '@/utils/types';

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectList({
  file = '',
  maxProjects = 0,
}: ProjectListProps): Promise<JSX.Element> {
  try {
    // Read the JSON file
    const fileName = process.cwd() + '/content/projects'+file+'.json';
    const fileContent = await fs.readFile(fileName, 'utf8');
    console.log('File: "' + fileName + '" loaded.');
    
    // Check if file content is empty or undefined
    if (!fileContent) {
      throw new Error('File: "' + fileName + '" was not loaded. 12414');
    }

    const data: ProjectsData = JSON.parse(fileContent);

    // Check if projects array exists and is not empty
    if (!data.projects || data.projects.length === 0) {
      throw new Error('No projects found in the JSON file');
    }

    // Limit the number of projects if maxProjects is provided
    const projectsToRender = maxProjects > 0 ? data.projects.slice(0, maxProjects) : data.projects;

	return <ClientProjectList projects={projectsToRender} />;
    
  } catch (error) {
    console.error('Error reading or parsing JSON:', error);
    return (
      <div style={{ textAlign: 'center', margin: '2rem' }}>
        <h2>OOPSIE!</h2>
        <p className='center error'>There was a problem loading projects.</p>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
