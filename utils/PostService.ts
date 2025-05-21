import { Post, IPostRepository, IContentParser, IPostService } from './types';
import { settings } from './settings.mjs';
import { FileSystemPostRepository } from './FileSystemPostRepository';
import { MatterContentParser } from './MatterContentParser';

// Path configuration
const BLOG_PATH = 'content/blog';

export class PostService implements IPostService {
	constructor(
		private repository: IPostRepository,
		private parser: IContentParser
	) {}

	getPost(slug: string): Post {
		const fileContent = this.repository.getPostContent(slug);
		const { content, data } = this.parser.parseContent(fileContent);

		return {
			content,
			title: data.title,
			description: data.description || '',
			image: data.image || '',
			tags: data.tags || '',
			slug: slug,
			url: `${settings.siteUrl}/post/${slug}`,
			created: data.created,
			lastUpdated: data.lastUpdated || data.created,
		};
	}

	getSlugs(tag = ''): string[] {
		const slugs = this.repository.getAllPostSlugs();

		if (tag) {
			return slugs.filter((slug) => {
				const { tags } = this.getPost(slug);
				return tags
					.split(',')
					.map((t) => t.trim())
					.includes(tag);
			});
		}

		return slugs;
	}

	getPosts(slugs?: string[]): Post[] {
		const slugsToUse = slugs || this.getSlugs();
		return slugsToUse.map((slug) => this.getPost(slug));
	}
}

// Create and export the default instance
const repository = new FileSystemPostRepository(BLOG_PATH);
const parser = new MatterContentParser();
const postService = new PostService(repository, parser);
export default postService;

// Export implementation classes for testing and DI
export { FileSystemPostRepository, MatterContentParser };
