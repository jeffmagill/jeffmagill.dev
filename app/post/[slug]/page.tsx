import React from 'react';
import Markdown from 'markdown-to-jsx';
import getPostMetadata from '@/utils/metadata';
import styles from './page.module.css';
import fs from 'fs';
import matter from 'gray-matter';

interface Post {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string;
}

function getPostContent(slug: string): Post {
  const folder = 'content/blog/';
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, 'utf8');

  const matterResult = matter(content);
  return {
    title: matterResult.data.title,
    description: matterResult.data.description,
    content: matterResult.content,
    image: matterResult.data.image,
    tags: matterResult.data.tags,
  } as Post;
}

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = getPostMetadata('content/blog');
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}): Promise<{ title: string }> {
  const id = params?.slug ? ' ⋅ ' + params?.slug : '';
  return {
    title: `${id.replaceAll('_', ' ')} - Andrew Magill's Developer Blog`,
  };
}

interface PostProps {
  params: { slug: string };
}

export default function Post(props: PostProps) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <main>
      <article className={styles.post}>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
}
