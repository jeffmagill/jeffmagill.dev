'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
	title: string;
	summary: string;
	description: string;
	image: string;
	tags: string[];
	onClick: () => void;
}

export default function ProjectCard({
	title,
	summary,
	image,
	tags,
	onClick,
}: ProjectCardProps) {
	return (
		<div className={`${styles.projectCard} projectCard`} onClick={onClick}>
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
		</div>
	);
}
