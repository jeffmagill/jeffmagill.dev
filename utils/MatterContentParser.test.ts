import { describe, it, expect } from 'vitest';
import { MatterContentParser } from './MatterContentParser';

describe('MatterContentParser', () => {
	const parser = new MatterContentParser();

	it('parses frontmatter and content correctly', () => {
		const md = `---\ntitle: My Title\ncreated: 2020-01-01\n---\n# Hello\nThis is content`;

		const result = parser.parseContent(md);

		expect(result.content.trim()).toBe('# Hello\nThis is content');
		expect(result.data.title).toBe('My Title');
		// created in frontmatter may be parsed as a Date object or string; compare ISO forms
		const actualIso = new Date(result.data.created).toISOString();
		const expectedIso = new Date('2020-01-01').toISOString();
		expect(actualIso).toBe(expectedIso);
	});

	it('applies defaults when fields are missing', () => {
		const md = `---\n---\nNo frontmatter fields here`;

		const result = parser.parseContent(md);

		expect(result.content.trim()).toBe('No frontmatter fields here');
		expect(result.data.title).toBe('Untitled');
		// created should be an ISO string
		expect(typeof result.data.created).toBe('string');
		expect(!Number.isNaN(Date.parse(result.data.created))).toBe(true);
	});
});
