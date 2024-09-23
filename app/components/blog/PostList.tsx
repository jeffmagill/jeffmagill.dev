// app/components/blog/PostList.tsx

import React from 'react';
import PostItem from './PostItem';
import getPostMetadata from '@/utils/metadata';
import styles from './PostList.module.css';

interface PostListProps {
  tag?: string;
  maxPosts?: number;
}

interface Post {
  title: any;
  description: any;
  image: any;
  tags: any;
  slug: string;
  created: string;
}

const PostList: React.FC<PostListProps> = ({ tag = '', maxPosts = 0 }) => {
  // Get the list of posts, passing the optional tag
  const allPosts = getPostMetadata(tag) as Post[];

  // Sort posts by created date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => {
    return parseInt(b.created) - parseInt(a.created);
  });

  // Limit the number of posts if maxPosts is provided
  const posts = maxPosts ? sortedPosts.slice(0, maxPosts) : sortedPosts;

  return (
    <div className={`${styles.postList} postList`}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
