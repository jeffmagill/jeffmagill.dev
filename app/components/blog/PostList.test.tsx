// PostList.test.tsx

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostList from './PostList';
import { getPostMetadata } from '@/utils/metadata';

// Mock the getPostMetadata function
vi.mock('@/utils/metadata');

// Mock the PostItem component
vi.mock('./PostItem', () => ({
  default: ({ post }: { post: any }) => (
    <div data-testid='post-item'>{post.title}</div>
  ),
}));

// Define the Post interface
interface Post {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string;
  url: string;
  created: Date;
  lastUpdated: Date;
}

describe('PostList', () => {
  const mockPosts: Post[] = [
    {
      slug: 'post-1',
      title: 'Post 1',
      description: 'Description 1',
      image: 'image1.jpg',
      tags: 'javascript, react',
      url: 'post-1',
      created: new Date('2022-01-01'),
      lastUpdated: new Date('2022-01-02'),
    },
    {
      slug: 'post-2',
      title: 'Post 2',
      description: 'Description 2',
      image: 'image2.jpg',
      tags: 'python, django',
      url: 'post-2',
      created: new Date('2024-11-21'),
      lastUpdated: new Date('2024-12-02'),
    },
    {
      slug: 'post-3',
      title: 'Post 3',
      description: 'Description 3',
      image: 'image3.jpg',
      tags: 'javascript, node',
      url: 'post-3',
      created: new Date('2023-04-01'),
      lastUpdated: new Date('2022-04-02'),
    },
    {
      slug: 'post-4',
      title: 'Post 4',
      description: 'Description 4',
      image: 'image4.jpg',
      tags: 'ruby, rails',
      url: 'post-4',
      created: new Date('2022-01-03'),
      lastUpdated: new Date('2022-01-03'),
    },
    {
      slug: 'post-5',
      title: 'Post 5',
      description: 'Description 5',
      image: 'image5.jpg',
      tags: 'java, spring',
      url: 'post-5',
      created: new Date('2021-02-01'),
      lastUpdated: new Date('2022-01-03'),
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getPostMetadata).mockImplementation((tag?: string) => {
      if (tag) {
        return mockPosts
          .filter((post) => post.tags.toLowerCase().includes(tag.toLowerCase()))
          .map((post) => ({
            ...post,
            url: post.slug,
            created: new Date(),
            lastUpdated: new Date(),
          }));
      }
      return mockPosts.map((post) => ({
        ...post,
        url: post.slug,
        created: new Date(),
        lastUpdated: new Date(),
      }));
    });
  });

  it('renders all posts when no props are provided', () => {
    render(<PostList />);

    expect(screen.getAllByTestId('post-item')).toHaveLength(5);
    expect(screen.getByText('Post 1')).toBeDefined();
    expect(screen.getByText('Post 5')).toBeDefined();
  });
  // TODO: test renders filtered posts when a tag is provided

  // TODO: test limits the number of posts when maxPosts is provided

  // TODO: test applies both tag filtering and maxPosts limit

  it('applies the correct CSS classes', () => {
    const { container } = render(<PostList />);

    const postListContainer = container.firstChild as HTMLElement;
    expect(postListContainer.classList.contains('postList')).toBe(true);
  });
});
