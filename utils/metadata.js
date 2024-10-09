/**
 * @name getPostMetadata
 * @description Get all post metadata
 * @param {string} tag
 * @returns {Post[]}
 */

import fs from 'fs';
import matter from 'gray-matter';

const getPostMetadata = (tag = '') => {
  // get the list of posts
  const basePath = 'content/blog';
  const folder = basePath + '/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  // get the file data
  const posts = markdownPosts.map((filename) => {
    const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8');
    const matterResult = matter(fileContents);

    // return the post data
    return {
      title: matterResult.data.title || '',
      description: matterResult.data.description || '',
      image:
        matterResult.data.image ||
        '/images/blog/clarissa-watson-pencil-unsplash.jpg',
      tags: matterResult.data.tags || '',
      slug: filename.replace('.md', ''),
      created: matterResult.data.created,
      lastUpdated: matterResult.data.lastUpdated,
    };
  });

  // Filter posts by tag if a tag is provided
  if (tag) {
    const filteredPosts = posts.filter(
      (post) =>
        post.tags &&
        typeof post.tags === 'string' &&
        post.tags.toLowerCase().includes(tag.toLowerCase())
    );
    return filteredPosts;
  } else {
    return posts;
  }
};

const getPostContent = (slug = '') => {
  const file = 'content/blog/' + `${slug}.md`;
  let content;

  // If the file exists, read the file
  if (fs.existsSync(file)) {
    content = fs.readFileSync(file, 'utf8');
    console.log('File: "' + file + '" loaded.');
  } else {
    console.log('File: "' + file + '" not found.');
    notFound();
  }

  const matterResult = matter(content);
  return {
    title: matterResult.data.title,
    description: matterResult.data.description,
    content: matterResult.content,
    image: matterResult.data.image,
    tags: matterResult.data.tags,
    created: matterResult.data.created,
    lastUpdated: matterResult.data.lastUpdated,
  };
};

export { getPostMetadata, getPostContent };
