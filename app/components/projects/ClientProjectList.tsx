'use client';

import { useState } from 'react';
import Project from './Project';
import Modal from '../global/Modal';
import Image from 'next/image';
import styles from './ClientProjectList.module.scss';
import { Project as ProjectType } from '@/utils/types';

export default function ClientProjectList({ projects }: { projects: ProjectType[] }) {
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
    <section className={`${styles.projectsContainer} projectsContainer`}>
      <div className={`${styles.projectsGrid} projectsGrid`}>
        {projects.map((project, index) => (
          <Project 
            key={index} 
            {...project} 
            onClick={() => openProjectModal(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          size="large"
          showHeader={false}
        >
          <div className={styles.projectModalContent}>
            <div className={styles.projectModalImage}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={600}
                height={400}
                className={styles.fullImage}
                priority={isModalOpen}
              />
            </div>
            <div className={styles.projectModalInfo}>
              <h2 className={styles.projectModalTitle}>{selectedProject.title}</h2>
              <p className={styles.projectModalSummary}>{selectedProject.summary}</p>
              <div
                className={styles.projectModalDescription}
                dangerouslySetInnerHTML={{ __html: selectedProject.description }}
              />
              <div className={styles.projectModalTags}>
                {selectedProject.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}