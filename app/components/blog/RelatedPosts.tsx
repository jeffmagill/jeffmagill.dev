import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import postService from '@/utils/PostService';
import { Post as PostType } from '@/utils/types';
import styles from './RelatedPosts.module.scss';
import RelatedPostsReveal from './RelatedPostsReveal';

interface RelatedPostsProps {
	tags: string;
	currentSlug?: string;
	maxResults?: number;
}

/**
 * Server component that finds and renders the top N posts sharing the most tags
 * with the current post. Runs at build time (SSG) because it reads from the
 * filesystem via the existing `postService`.
 */
export default function RelatedPosts({
	tags,
	currentSlug,
	maxResults = 4,
}: RelatedPostsProps) {
	if (!tags) return null;

	const inputTags = tags
		.split(',')
		.map((t) => t.trim().toLowerCase())
		.filter(Boolean);

	if (inputTags.length === 0) return null;

	// postService may provide getPosts (real runtime) or only getSlugs/getPost (test mocks).
	let posts: PostType[] = [];
	if (typeof (postService as any).getPosts === 'function') {
		posts = (postService as any).getPosts();
	} else if (
		typeof (postService as any).getSlugs === 'function' &&
		typeof (postService as any).getPost === 'function'
	) {
		const slugs: string[] = (postService as any).getSlugs();
		posts = slugs.map((s: string) => (postService as any).getPost(s));
	} else {
		posts = [];
	}

	const scored = posts
		.filter((p) => p.slug !== currentSlug)
		.map((p) => {
			const pTags = (p.tags || '')
				.split(',')
				.map((t) => t.trim().toLowerCase())
				.filter(Boolean);
			const shared = pTags.filter((t) => inputTags.includes(t)).length;
			return { post: p, score: shared };
		})
		// sort by descending shared tags, then by title for deterministic order
		.sort(
			(a, b) => b.score - a.score || a.post.title.localeCompare(b.post.title)
		);

	const top = scored.slice(0, maxResults).map((s) => s.post);

	if (top.length === 0) return null;

		return (
			<RelatedPostsReveal className={styles.container}>
				<aside>
					<h2 className={styles.heading}>Related Articles</h2>
					<ul className={styles.list}>
						{top.map((p, i) => (
							<li
								className={styles.item}
								key={p.slug}
								style={{ ['--index' as any]: i } as React.CSSProperties}
							>
								<Link href={`/post/${p.slug}/`} className={styles.link}>
									<div className={styles.imageWrap}>
										<Image
											src={p.image || '/images/magill-dev-thumb.jpg'}
											alt={`Preview of ${p.title}`}
											width={72}
											height={72}
											className={styles.image}
										/>
									</div>
									<div className={styles.content}>
										<h3 className={styles.title}>{p.title}</h3>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</aside>
			</RelatedPostsReveal>
		);
}
