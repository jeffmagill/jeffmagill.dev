import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import matter from 'gray-matter';
import { getPost, getSlugs, getPosts } from './posts';
import { settings } from './settings.mjs';

// Mock the fs and matter modules
vi.mock('fs');
vi.mock('gray-matter');

// Common mock data
const mockPostContent = `
  ---
  title: "Test Post"
  description: "This is a test post"
  image: "/images/test.jpg"
  tags: "test, post"
  created: "2023-01-01"
  lastUpdated: "2023-01-02"
  ---
  This is the content of the test post.
`;

const mockMatterResult = {
  content: 'This is the content of the test post.',
  data: {
    title: 'Test Post',
    description: 'This is a test post',
    image: '/images/test.jpg',
    tags: 'test, post',
    created: '2023-01-01',
    lastUpdated: '2023-01-02',
  },
};

// Helper function to set up mocks
const setupMocks = (mockFiles, mockPostContent, mockMatterResult) => {
  vi.mocked(fs.readdirSync).mockReturnValue(mockFiles);
  vi.mocked(fs.readFileSync).mockReturnValue(mockPostContent);
  vi.mocked(matter).mockReturnValue(mockMatterResult);
};

describe('getPost', () => {
  beforeEach(() => {
    setupMocks(['test-post.md'], mockPostContent, mockMatterResult);
  });

  it('should return the correct post data', () => {
    const slug = 'test-post';
    const post = getPost(slug);

    expect(post).toEqual({
      content: 'This is the content of the test post.',
      title: 'Test Post',
      description: 'This is a test post',
      image: '/images/test.jpg',
      tags: 'test, post',
      slug: 'test-post',
      url: `${settings.siteUrl}/post/test-post`,
      created: '2023-01-01',
      lastUpdated: '2023-01-02',
    });
  });

  it('should handle missing optional fields', () => {
    const mockMatterResultMissingFields = {
      content: 'This is the content of the test post.',
      data: {
        title: 'Test Post',
        image: '/images/test.jpg',
        created: '2023-01-01',
      },
    };

    setupMocks(
      ['test-post.md'],
      mockPostContent,
      mockMatterResultMissingFields
    );

    const slug = 'test-post';
    const post = getPost(slug);

    expect(post).toEqual({
      content: 'This is the content of the test post.',
      title: 'Test Post',
      description: '',
      image: '/images/test.jpg',
      tags: '',
      slug: 'test-post',
      url: `${settings.siteUrl}/post/test-post`,
      created: '2023-01-01',
      lastUpdated: '2023-01-01',
    });
  });
});

describe('getSlugs', () => {
  it('should return the correct slugs', () => {
    const mockFiles = ['test-post.md', 'another-post.md'];
    vi.mocked(fs.readdirSync).mockReturnValue(mockFiles);

    const slugs = getSlugs();
    expect(slugs).toEqual(['test-post', 'another-post']);
  });
});

describe('getPosts', () => {
  it('should return the correct posts', () => {
    const mockFiles = ['test-post.md', 'another-post.md'];
    const mockMatterResultAnotherPost = {
      content: 'This is the content of another post.',
      data: {
        title: 'Another Post',
        description: 'This is another post',
        image: '/images/another.jpg',
        tags: 'another, post',
        created: '2023-01-03',
        lastUpdated: '2023-01-04',
      },
    };

    setupMocks(mockFiles, mockPostContent, mockMatterResult);
    vi.mocked(matter)
      .mockReturnValueOnce(mockMatterResult)
      .mockReturnValueOnce(mockMatterResultAnotherPost);

    const posts = getPosts();
    expect(posts).toEqual([
      {
        content: 'This is the content of the test post.',
        title: 'Test Post',
        description: 'This is a test post',
        image: '/images/test.jpg',
        tags: 'test, post',
        slug: 'test-post',
        url: `${settings.siteUrl}/post/test-post`,
        created: '2023-01-01',
        lastUpdated: '2023-01-02',
      },
      {
        content: 'This is the content of another post.',
        title: 'Another Post',
        description: 'This is another post',
        image: '/images/another.jpg',
        tags: 'another, post',
        slug: 'another-post',
        url: `${settings.siteUrl}/post/another-post`,
        created: '2023-01-03',
        lastUpdated: '2023-01-04',
      },
    ]);
  });
});
