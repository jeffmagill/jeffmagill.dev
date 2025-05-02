'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './ProjectList.module.scss';
import { Project as ProjectType } from '@/utils/types';

export default function ProjectList({ projects }: { projects: ProjectType[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const openProjectModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={`${styles.projectList} projectList`}>
      <div className={`${styles.projectListInner} projectListInner`}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            {...project} 
            onClick={() => openProjectModal(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}