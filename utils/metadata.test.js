import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import matter from 'gray-matter';
import getPostMetadata from './metadata'; // Adjust this path as needed

// Mock the fs and matter modules
vi.mock('fs');
vi.mock('gray-matter');

describe('getPostMetadata', () => {
  it('should return correct post metadata', () => {
    // Mock the file system
    fs.readdirSync.mockReturnValue(['post1.md', 'post2.md', 'notapost.txt']);
    fs.readFileSync.mockImplementation((path) => {
      if (path.includes('post1.md')) {
        return 'content of post1';
      } else if (path.includes('post2.md')) {
        return 'content of post2';
      }
    });

    // Mock the matter function
    matter.mockImplementation((content) => {
      if (content === 'content of post1') {
        return {
          data: {
            title: 'Post 1',
            description: 'Description 1',
            image: 'image1.jpg',
            tags: ['tag1', 'tag2'],
          },
        };
      } else if (content === 'content of post2') {
        return {
          data: {
            title: 'Post 2',
            description: 'Description 2',
            image: 'image2.jpg',
            tags: ['tag2', 'tag3'],
          },
        };
      }
    });

    const result = getPostMetadata('/fake/path');

    expect(result).toEqual([
      {
        title: 'Post 1',
        description: 'Description 1',
        image: 'image1.jpg',
        tags: ['tag1', 'tag2'],
        slug: 'post1',
      },
      {
        title: 'Post 2',
        description: 'Description 2',
        image: 'image2.jpg',
        tags: ['tag2', 'tag3'],
        slug: 'post2',
      },
    ]);

    // Verify that the functions were called with the correct arguments
    expect(fs.readdirSync).toHaveBeenCalledWith('/fake/path/');
    expect(fs.readFileSync).toHaveBeenCalledWith('/fake/path/post1.md', 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith('/fake/path/post2.md', 'utf8');
  });
});