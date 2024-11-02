/**
 * Post Page Component
 *
 * Renders a blog post with metadata, content, and sharing options
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
import React from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';

import { settings } from '@/utils/settings.mjs';
import { getPost, getSlugs } from '@/utils/posts';
import { Post as PostType } from '@/utils/types';
import Hero from '@/app/components/global/Hero';
import PostDate from '@/app/components/blog/PostDate';
import ShareButtons from '@/app/components/blog/ShareButtons';
import styles from './page.module.scss';

/**
 * Generates static paths for all blog posts at build time
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 * @returns Array of slug objects for static path generation
 */
export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const slugs = getSlugs();
  return slugs.map((slug) => ({ slug }));
};

/**
 * Generates metadata for each blog post page
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @param params - Object containing slug parameter
 * @param searchParams - Search parameters from the URL
 * @returns Metadata object for the blog post
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post: PostType = getPost(params.slug) as PostType;

  const meta = {
    title: `${post.title} - ${settings.title}`,
    url: `${settings.siteUrl}/post/${params.slug}/`,
  };

  return {
    title: meta.title,
    description: post.description,
    url: meta.url,
    openGraph: {
      title: meta.title,
      description: post.description,
      url: meta.url,
      images: [
        {
          url: `${settings.siteUrl}${post.image}`,
          alt: `Preview of ${post.title}`,
        },
      ],
      type: 'article',
      publishedTime: post.created,
      modifiedTime: post.lastUpdated,
    },
    twitter: {
      title: meta.title,
      description: post.description,
      images: [
        {
          url: `${settings.siteUrl}${post.image}`,
          alt: `Preview of ${post.title}`,
        },
      ],
    },
  };
}

interface PostProps {
  params: { slug: string };
}

/**
 * Post page component that displays a full blog post
 *
 * @param props - Component props containing slug parameter
 * @returns Rendered blog post page
 */
export default async function Post(props: PostProps) {
  const slug = props.params.slug;
  const post: PostType = getPost(slug) as PostType;

  // Handle author display with fallback to settings
  const displayAuthor = (post as any)?.author ?? settings.author;

  return (
    <main className={styles.main}>
      <Hero>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
        <p className={styles.author}>
          by <Link href='/'>{displayAuthor}</Link>
        </p>
        <p className={styles.publishDate}>
          <PostDate created={post.created} lastUpdated={post.lastUpdated} />
        </p>
      </Hero>

      <article className={styles.post}>
        <Markdown>{post.content}</Markdown>
        <ShareButtons title={post.title} />
      </article>

      {/* TODO: add related posts component */}
    </main>
  );
}
