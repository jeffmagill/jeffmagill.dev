// app/components/blog/PostList.tsx

import React from 'react';

import PostItem from './PostItem';
import getPostMetadata from '@/utils/metadata';

// Import CSS
import styles from './PostList.module.css';

// Define the props interface
interface PostListProps {
  tag?: string;
  maxPosts?: number;
}

/**
 * PostList component
 *
 * Displays a list of blog posts, optionally filtered by tag and limited by maxPosts
 */
const PostList: React.FC<PostListProps> = ({ tag = '', maxPosts = 0}) => {
  // Get the list of posts, passing the optional tag
  const allPosts = getPostMetadata(tag);

  // Limit the number of posts if maxPosts is provided
  const posts = maxPosts ? allPosts.slice(0, maxPosts) : allPosts;

  return (
    // postList container
    <div className={`${styles.postList} postList`}>
      {/*
        Render a PostItem component for each post using slug as key
      */}
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

// Export the PostList
export default PostList;