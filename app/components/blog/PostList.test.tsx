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
  created: Date; 
}

describe('PostList', () => {
  const mockPosts: Post[] = [
    {
      slug: 'post-1',
      title: 'Post 1',
      description: 'Description 1',
      image: 'image1.jpg',
      tags: 'javascript, react',
      created: new Date('2022-01-01'),
    },
    {
      slug: 'post-2',
      title: 'Post 2',
      description: 'Description 2',
      image: 'image2.jpg',
      tags: 'python, django',
      created: new Date('2024-11-21'),
    },
    {
      slug: 'post-3',
      title: 'Post 3',
      description: 'Description 3',
      image: 'image3.jpg',
      tags: 'javascript, node',
      created: new Date('2023-04-01'),
    },
    {
      slug: 'post-4',
      title: 'Post 4',
      description: 'Description 4',
      image: 'image4.jpg',
      tags: 'ruby, rails',
      created: new Date('2022-01-03'),
    },
    {
      slug: 'post-5',
      title: 'Post 5',
      description: 'Description 5',
      image: 'image5.jpg',
      tags: 'java, spring',
      created: new Date('2021-02-01'),
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getPostMetadata).mockImplementation((tag?: string) => {
      if (tag) {
        return mockPosts.filter((post) =>
          post.tags.toLowerCase().includes(tag.toLowerCase())
        ).map((post) => ({
          ...post,
          created: new Date(), // Add this line
        }));
      }
      return mockPosts.map((post) => ({
        ...post,
        created: new Date(),
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
