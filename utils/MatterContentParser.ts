// Parses Markdown content with frontmatter using gray-matter.
// Returns validated post data for use in blog and content features.

import matter from 'gray-matter';
import { IContentParser, PostContent } from './types';

export class MatterContentParser implements IContentParser {
	parseContent(content: string): PostContent {
		const parsed = matter(content);
		const { data, content: parsedContent } = parsed;

		// Ensure required properties are present or provide defaults
		const validatedData = {
			title: data.title || 'Untitled',
			created: data.created || new Date().toISOString(),
			...data,
		};

		return {
			content: parsedContent,
			data: validatedData,
		};
	}
}
