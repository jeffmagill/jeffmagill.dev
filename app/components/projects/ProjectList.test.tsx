// ProjectList.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock the 'fs' module
vi.mock('fs', () => ({
  default: {
    promises: {
      readFile: vi.fn(),
    },
  },
  promises: {
    readFile: vi.fn(),
  },
}));

// Import the mocked 'fs' module
import * as fs from 'fs';

// Mock the Project component
vi.mock('./Project', () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid='project'>{title}</div>
  ),
}));

// Import the component to be tested
import ProjectList from './ProjectList';

describe('ProjectList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Mock the file system
  const mockProjects = {
    projects: [
      {
        title: 'Project 1',
        summary: 'Summary 1',
        description: 'Description 1',
        image: 'image1.jpg',
        tags: ['tag1'],
        created: new Date(),
      },
      {
        title: 'Project 2',
        summary: 'Summary 2',
        description: 'Description 2',
        image: 'image2.jpg',
        tags: ['tag2'],
        created: new Date(),
      },
      {
        title: 'Project 3',
        summary: 'Summary 3',
        description: 'Description 3',
        image: 'image3.jpg',
        tags: ['tag3'],
        created: new Date(),
      },
      {
        title: 'Project 4',
        summary: 'Summary 4',
        description: 'Description 4',
        image: 'image4.jpg',
        tags: ['tag4'],
        created: new Date(),
      },
    ],
  };

  // TODO: repair this test

  // it('renders all projects when maxProjects is not provided', async () => {
  //   vi.mocked(fs.promises.readFile).mockResolvedValue(JSON.stringify(mockProjects));
  //   const { debug } = render(await ProjectList({}));
  //   debug();
  //   const projectElements = await screen.findAllByTestId('project');
  //   expect(projectElements.length).toBe(4);
  // });

  // it('limits the number of projects rendered when maxProjects is provided', async () => {
  //   vi.mocked(fs.promises.readFile).mockResolvedValue(JSON.stringify(mockProjects));
  //   const { debug } = render(await ProjectList({ maxProjects: 2 }));
  //   debug();
  //   const projectElements = await screen.findAllByTestId('project');
  //   expect(projectElements.length).toBe(2);
  // });

  it('renders error message when file reading fails', async () => {
    vi.mocked(fs.promises.readFile).mockRejectedValue(
      new Error('File read error')
    );
    const { debug } = render(await ProjectList({}));
    debug();
    expect(await screen.findByText('OOPSIE!')).toBeDefined();
    expect(
      await screen.findByText('There was a problem loading projects.')
    ).toBeDefined();
  });

  it('renders error message when JSON parsing fails', async () => {
    vi.mocked(fs.promises.readFile).mockResolvedValue('Invalid JSON');
    const { debug } = render(await ProjectList({}));
    debug();
    expect(await screen.findByText('OOPSIE!')).toBeDefined();
    expect(
      await screen.findByText('There was a problem loading projects.')
    ).toBeDefined();
  });

  it('renders error message when projects array is empty', async () => {
    vi.mocked(fs.promises.readFile).mockResolvedValue(
      JSON.stringify({ projects: [] })
    );
    const { debug } = render(await ProjectList({}));
    debug();
    expect(await screen.findByText('OOPSIE!')).toBeDefined();
    expect(
      await screen.findByText('There was a problem loading projects.')
    ).toBeDefined();
  });
});
