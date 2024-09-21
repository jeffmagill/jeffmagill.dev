import fs from 'fs';
import matter from 'gray-matter';

export default function getPostMetadata(tag = '') {
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
      title: matterResult.data.title,
      description: matterResult.data.description,
      image: matterResult.data.image,
      tags: matterResult.data.tags,
      slug: filename.replace('.md', ''),
    };
  });

  // Filter posts by tag if a tag is provided
  if (tag) {
    return posts.filter(post => 
      post.tags && typeof post.tags === 'string' && post.tags.toLowerCase().includes(tag.toLowerCase())
    );
  }
  else {
    return posts;
  }
}