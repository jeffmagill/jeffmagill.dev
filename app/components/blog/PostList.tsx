// app/components/blog/PostList.tsx

import React from 'react';

import PostItem from './PostItem';
import getPostMetadata from '@/utils/metadata';

// Import CSS
import styles from './PostList.module.css';

/**
 * PostList component
 *
 * Displays a list of blog posts
 */
const PostList = () => {
  // Get the list of posts
  const posts = getPostMetadata('content/blog');
  return (
    // postList container
    <div className={`${styles.postList} postList`} >
      {/*
        Render a PostItem component for each post using slug as key
      */}
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

// Export the PostList component as the default export
export default PostList;
