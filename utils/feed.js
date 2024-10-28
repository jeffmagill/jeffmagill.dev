import Rss from 'rss';
import { settings } from '@/utils/settings.mjs';
import { getPostMetadata } from '@/utils/metadata';

/**
 * @name getPostFeed
 * @description Get all post feed
 * @param {Post[]}
 * @returns {Rss}
 */
const getPostFeed = (posts = []) => {
  // set feed values
  const feed = new Rss({
    title: settings.title,
    description: settings.description,
    site_url: settings.siteUrl,
    feed_url: `${settings.siteUrl}/feed/posts.xml`,
    language: 'en',
    copyright:
      'All rights reserved ' + new Date().getFullYear() + ' ' + settings.title,
  });

  // get the post data
  posts = posts.length > 0 ? posts : getPostMetadata();

  posts.map((post) => {
    // add the post to the feed
    feed.item({
      title: post.title,
      guid: `${settings.siteUrl}/post/${post.slug}`,
      url: `${settings.siteUrl}/post/${post.slug}`,
      date: post.date,
      description: post.description,
      author: post.author || settings.author,
      categories: post.categories || [],
    });
  });

  return feed;
};

export { getPostFeed };
