import { describe, it, expect } from 'vitest';
import { FileSystemPostRepository } from './FileSystemPostRepository';
import { MatterContentParser } from './MatterContentParser';
import { PostService } from './PostService';
import path from 'path';

describe('PostService integration', () => {
    it('reads and parses a real markdown fixture', () => {
        const fixturesPath = path.resolve(__dirname, '../tests/fixtures/content/blog');
        const repo = new FileSystemPostRepository(fixturesPath);
        const parser = new MatterContentParser();
        const service = new PostService(repo, parser);

        const post = service.getPost('test-post');

        expect(post.title).toBe('Fixture Post');
        expect(post.description).toBe('This is a fixture post used in tests');
        expect(post.content).toContain('Fixture Content');
        expect(post.tags).toContain('testing');
        expect(post.image).toBe('/images/fixture.jpg');
    });
});
