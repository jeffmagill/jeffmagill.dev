'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Project.module.scss';
import Modal from '../global/Modal';

interface ProjectProps {
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
}

export default function Project({
  title,
  summary,
  description,
  image,
  tags,
}: ProjectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className={`${styles.projectCard} projectCard`}
        onClick={openModal}
      >
        <div className={`${styles.projectImageContainer} projectImageContainer`}>
          <Image
            src={image}
            alt={title}
            width={285}
            height={285}
            className={styles.projectImage}
          />
        </div>
        <h3>{title}</h3>
        <p className={styles.projectSummary}>{summary}</p>
        <div className={styles.tags}>
          {tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        size="large"
        showHeader={false}
      >
        <div className={styles.projectModalContent}>
          <div className={styles.projectModalImage}>
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className={styles.fullImage}
              priority={isModalOpen} // Load with priority when modal is open
            />
          </div>
          <div className={styles.projectModalInfo}>
            <h2 className={styles.projectModalTitle}>{title}</h2>
            <p className={styles.projectModalSummary}>{summary}</p>
            <div
              className={styles.projectModalDescription}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className={styles.projectModalTags}>
              {tags.map((tag, tagIndex) => (
                <span key={tagIndex} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
