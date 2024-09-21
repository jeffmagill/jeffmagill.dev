// app/components/blog/PostList.tsx

import React from 'react';

import PostItem from './PostItem';
import getPostMetadata from '@/utils/metadata';

// Import CSS
import styles from './PostList.module.css';

// Define the props interface
interface PostListProps {
  tag?: string;
}

/**
 * PostList component
 *
 * Displays a list of blog posts, optionally filtered by tag
 */
const PostList: React.FC<PostListProps> = ({ tag }) => {
  // Get the list of posts, passing the optional tag
  const posts = getPostMetadata(tag);

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
