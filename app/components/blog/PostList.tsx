// app/components/blog/PostList.tsx

import React from 'react';
import { getSlugs, getPost } from '@/utils/posts';
import { Post as PostType } from '@/utils/types';
import PostItem from './PostItem';
import styles from './PostList.module.css';

interface PostListProps {
  tag?: string;
  maxPosts?: number;
}

const PostList = ({ tag = '', maxPosts = 0 }: PostListProps) => {
  const slugs = getSlugs(tag);
  const postData: PostType[] = slugs.map((slug) => getPost(slug));

  // Sort posts by created date (newest first)
  const sortedPosts = postData.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });

  // Limit the number of posts if maxPosts is provided
  const limitedPosts = maxPosts ? sortedPosts.slice(0, maxPosts) : sortedPosts;

  return (
    <div className={`${styles.postList} postList`}>
      {limitedPosts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
