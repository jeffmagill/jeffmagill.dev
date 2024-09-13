// components/PostList.tsx
import React from 'react';
import PostItem from './PostItem';
import getPostMetadata from '@/utils/metadata';
import styles from './PostList.module.css';

const PostList = () => {
  const posts = getPostMetadata('content/blog');
  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
