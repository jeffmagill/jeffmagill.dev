// app/components/Project.tsx
import Image from 'next/image';
import styles from './Project.module.scss';

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
	return (
		<div className={styles.projectCard}>
			<div className={styles.projectImageContainer}>
				{/* TODO: Link to more project details */}
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
			<div
				className={styles.projectDescription}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
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
