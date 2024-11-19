import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { settings } from '@/utils/settings.mjs';
import { Post as PostType } from '@/utils/types';

const basePath = 'content/blog';

/**
 * Returns the content and front matter data for a specific post given the post slug.
 * @param {string} slug
 * @returns {Post}
 */
export const getPost = (slug: string): PostType => {
	// Read the file content and front matter data for the given slug
	const filePath = path.join(basePath, `${slug}.md`);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const { content, data } = matter(fileContents);

	return {
		content,
		title: data.title,
		description: data.description || '',
		image: data.image,
		tags: data.tags || '',
		slug: slug,
		url: `${settings.siteUrl}/post/${slug}`,
		created: data.created,
		lastUpdated: data.lastUpdated || data.created,
	};
};

/**
 * Returns an array of slugs from posts that contain a specific string parameter in the tag field,
 * or all posts if the tag parameter is missing.
 * @param {string} tag
 * @returns {string[]}
 */
export const getSlugs = (tag = ''): string[] => {
	// Get the list of markdown files
	const files = fs.readdirSync(basePath);
	const markdownPosts = files.filter((file) => file.endsWith('.md'));

	// Filter posts by tag if provided
	const slugs = markdownPosts.map((filename) => filename.replace('.md', ''));
	if (tag) {
		return slugs.filter((slug) => {
			const { tags } = getPost(slug);
			return tags
				.split(',')
				.map((t) => t.trim())
				.includes(tag);
		});
	}

	return slugs;
};

/**
 * Accepts an array of slugs and returns an array of posts containing front matter data and content.
 * If no slugs are provided, returns all posts.
 * @param {string[]} [slugs]
 * @returns {Post[]}
 */
export const getPosts = (slugs?: string[]): PostType[] => {
	// Get the list of slugs if not provided
	if (!slugs) {
		slugs = getSlugs();
	}

	// Get the posts for the given slugs
	return slugs.map((slug) => getPost(slug));
};
