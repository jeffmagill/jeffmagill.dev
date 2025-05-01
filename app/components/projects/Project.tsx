'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Project.module.scss';

interface ProjectProps {
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  onClick: () => void;
}

export default function Project({
  title,
  summary,
  image,
  tags,
  onClick,
}: ProjectProps) {
  return (
    <div 
      className={`${styles.projectCard} projectCard`}
      onClick={onClick}
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
  );
}
