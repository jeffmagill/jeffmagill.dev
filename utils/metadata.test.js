import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import matter from 'gray-matter';
import { getPostMetadata } from './metadata';
import { settings } from './settings.mjs';

// Mock the fs and matter modules
vi.mock('fs');
vi.mock('gray-matter');

describe('getPostMetadata', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock the file system
    fs.readdirSync.mockReturnValue([
      'post1.md',
      'post2.md',
      'post3.md',
      'notapost.txt',
    ]);
    fs.readFileSync.mockImplementation((path) => {
      if (path.includes('post1.md')) return 'content of post1';
      if (path.includes('post2.md')) return 'content of post2';
      if (path.includes('post3.md')) return 'content of post3';
    });

    // Mock the matter function
    vi.mocked(matter).mockImplementation((content) => {
      if (content === 'content of post1') {
        return {
          data: {
            title: 'Post 1',
            description: 'Description 1',
            image: 'image1.jpg',
            tags: 'javascript, react',
            created: 0,
            lastUpdated: 0,
          },
        };
      }
      if (content === 'content of post2') {
        return {
          data: {
            title: 'Post 2',
            description: 'Description 2',
            image: 'image2.jpg',
            tags: 'python, django',
            created: 0,
            lastUpdated: 0,
          },
        };
      }
      if (content === 'content of post3') {
        return {
          data: {
            title: 'Post 3',
            description: 'Description 3',
            image: 'image3.jpg',
            tags: 'javascript, node',
            created: 0,
            lastUpdated: 0,
          },
        };
      }
    });
  });

  it('should return all post metadata when no tag is provided', () => {
    const result = getPostMetadata();

    expect(result).toEqual([
      {
        title: 'Post 1',
        description: 'Description 1',
        image: 'image1.jpg',
        tags: 'javascript, react',
        slug: 'post1',
        url: settings.siteUrl + '/post/post1',
        created: 0,
        lastUpdated: 0,
      },
      {
        title: 'Post 2',
        description: 'Description 2',
        image: 'image2.jpg',
        tags: 'python, django',
        slug: 'post2',
        url: settings.siteUrl + '/post/post2',
        created: 0,
        lastUpdated: 0,
      },
      {
        title: 'Post 3',
        description: 'Description 3',
        image: 'image3.jpg',
        tags: 'javascript, node',
        slug: 'post3',
        url: settings.siteUrl + '/post/post3',
        created: 0,
        lastUpdated: 0,
      },
    ]);

    expect(fs.readdirSync).toHaveBeenCalledWith('content/blog/');
    expect(fs.readFileSync).toHaveBeenCalledTimes(3);
  });

  it('should return filtered post metadata when a tag is provided', () => {
    const result = getPostMetadata('javascript');

    expect(result).toEqual([
      {
        title: 'Post 1',
        description: 'Description 1',
        image: 'image1.jpg',
        tags: 'javascript, react',
        slug: 'post1',
        url: settings.siteUrl + '/post/post1',
        created: 0,
        lastUpdated: 0,
      },
      {
        title: 'Post 3',
        description: 'Description 3',
        image: 'image3.jpg',
        tags: 'javascript, node',
        slug: 'post3',
        url: settings.siteUrl + '/post/post3',
        created: 0,
        lastUpdated: 0,
      },
    ]);

    expect(fs.readdirSync).toHaveBeenCalledWith('content/blog/');
    expect(fs.readFileSync).toHaveBeenCalledTimes(3);
  });

  it('should return an empty array when no posts match the provided tag', () => {
    const result = getPostMetadata('ruby');

    expect(result).toEqual([]);

    expect(fs.readdirSync).toHaveBeenCalledWith('content/blog/');
    expect(fs.readFileSync).toHaveBeenCalledTimes(3);
  });

  it('should handle case-insensitive tag matching', () => {
    const result = getPostMetadata('JAVASCRIPT');

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Post 1');
    expect(result[1].title).toBe('Post 3');
  });

  it('should match partial tags', () => {
    const result = getPostMetadata('java');

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Post 1');
    expect(result[1].title).toBe('Post 3');
  });
});
