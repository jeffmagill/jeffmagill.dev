import fs from 'fs';
import path from 'path';
import { IPostRepository } from './types';

export class FileSystemPostRepository implements IPostRepository {
  constructor(private basePath: string) {
    // Normalize path with forward slashes
    this.basePath = this.basePath.replace(/\\/g, '/');
  }

  getPostContent(slug: string): string {
    // Use forward slashes for consistent cross-platform paths
    const filePath = `${this.basePath}/${slug}.md`;
    return fs.readFileSync(filePath, 'utf8');
  }

  getAllPostSlugs(): string[] {
    const files = fs.readdirSync(this.basePath);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((filename) => filename.replace('.md', ''));
  }
}