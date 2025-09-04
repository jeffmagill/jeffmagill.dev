import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { FileSystemPostRepository } from './FileSystemPostRepository';

describe('FileSystemPostRepository', () => {
	const basePath = 'content/blog';
	let repo: FileSystemPostRepository;

	beforeEach(() => {
		repo = new FileSystemPostRepository(basePath);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('reads a file content for a given slug', () => {
		const readSpy = vi
			.spyOn(fs, 'readFileSync')
			.mockReturnValue('file-content');

		const content = repo.getPostContent('my-post');

		expect(readSpy).toHaveBeenCalled();
		expect(content).toBe('file-content');
	});

	it('lists markdown slugs from the directory', () => {
		const files = ['one.md', 'two.md', 'not-a-markdown.txt'];
		vi.spyOn(fs, 'readdirSync').mockReturnValue(files as any);

		const slugs = repo.getAllPostSlugs();

		expect(slugs).toEqual(['one', 'two']);
	});
});
