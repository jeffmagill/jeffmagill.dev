import { describe, it, expect } from 'vitest';
import { getPostMetadata } from './metadata';

describe('getPostMetadata', () => {
  it('should return an array of post metadata', async () => {
    const mockBasePath = '/mock/path';
    const mockFiles = ['post1.md', 'post2.md'];
    
    const readdirSyncMock = vi.mock('fs', () => ({
      readdirSync: vi.fn().mockReturnValue(mockFiles),
    }));

    const readFileSyncMock = vi.mock('fs', () => ({
      readFileSync: vi.fn().mockImplementation(() => '# Test Post\nTitle: Test Title\nDescription: This is a test.\nImage: /test-image.jpg\nTags: tag1,tag2'),
    }));

    const result = await getPostMetadata(mockBasePath);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      title: 'Test Title',
      description: 'This is a test.',
      image: '/test-image.jpg',
      tags: ['tag1', 'tag2'],
      slug: 'post1'
    });
    expect(result[1]).toEqual({
      title: 'Test Title',
      description: 'This is a test.',
      image: '/test-image.jpg',
      tags: ['tag1', 'tag2'],
      slug: 'post2'
    });

    expect(readdirSyncMock().mock.calls[0][0]).toBe(mockBasePath);
    expect(readFileSyncMock().mock.calls[0][0]).toContain('/mock/path/post1.md');
    expect(readFileSyncMock().mock.calls[1][0]).toContain('/mock/path/post2.md');
  });

  it('should handle empty directory', async () => {
    const mockBasePath = '/empty/path';
    
    const readdirSyncMock = vi.mock('fs', () => ({
      readdirSync: vi.fn().mockReturnValue([]),
    }));

    const result = await getPostMetadata(mockBasePath);

    expect(result).toEqual([]);
    expect(readdirSyncMock().mock.calls[0][0]).toBe(mockBasePath);
  });
});