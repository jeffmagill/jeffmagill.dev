/**
 * Post Page
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 *
 */
import React from 'react';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';

import { settings } from '@/utils/settings.mjs';
import { getPost, getSlugs } from '@/utils/posts';
import { Post as PostType } from '@/utils/types';
import Hero from '@/app/components/global/Hero';
import ShareButtons from '@/app/components/blog/ShareButtons';
import styles from './page.module.scss';

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const slugs = getSlugs();
  const params = slugs.map((slug) => ({
    slug,
  }));
  return params;
};

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}): Promise<{
  title: string;
  description: string;
  url: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    images: { url: string; alt: string }[];
    type: string;
    publishedTime: string;
    modifiedTime: string;
  };
  twitter: {
    title: string;
    description: string;
    images: { url: string; alt: string }[];
  };
}> {
  const post: PostType = getPost(params.slug) as PostType;

  const meta = {
    title: post.title + ' - ' + settings.title,
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
          url: settings.siteUrl + post.image,
          alt: 'Preview of ' + post.title,
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
          url: settings.siteUrl + post.image,
          alt: 'Preview of ' + post.title,
        },
      ],
    },
  };
}

interface PostProps {
  params: { slug: string };
}

export default async function Post(props: PostProps) {
  const slug = props.params.slug;
  const post: PostType = getPost(slug) as PostType;

  // Format the publish date
  const publishDate = new Date(Number(post.created) * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className={styles.main}>
      <Hero>
        <h1 className={styles.title}>{post.title} </h1>
        <p className={styles.description}>{post.description}</p>
        <p className={styles.author}>
          by <Link href='/'>Andrew Magill</Link>
        </p>
        <p className={styles.publishDate}>
          Published on <time dateTime={post.created}>{publishDate}</time>
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
