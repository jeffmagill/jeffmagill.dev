import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import matter from 'gray-matter';
import { getPost, getSlugs, getPosts } from './posts';
import { settings } from './settings.mjs';

// Mock the fs and matter modules
vi.mock('fs');
vi.mock('gray-matter');

describe('getPost', () => {
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

  beforeEach(() => {
    vi.mocked(fs.readFileSync).mockReturnValue(mockPostContent);
    vi.mocked(matter).mockReturnValue(mockMatterResult);
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

    vi.mocked(matter).mockReturnValue(mockMatterResultMissingFields);

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
// describe('getSlugs', () => {
//     // TODO: Add test cases for getSlugs
// });
// describe('getPosts', () => {
//     // TODO: Add test cases for getPosts
// });
