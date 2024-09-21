// components/PostItem.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PostItem.module.scss';

// PostItem.tsx
interface PostItemProps {
  post: {
    title: string;
    description: string;
    image: string;
    tags: string[] | string | null; // Add a union type for tags
    slug: string;
  };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const tags = Array.isArray(post.tags) ? post.tags : [post.tags]; // Convert tags to an array if it's not already one

  return (
    <div className={`${styles.postItem} postItem`}>
      <Link href={`/post/${post.slug}`}>
        <span className={`${styles.postThumb} postThumb`}>
          <Image src={post.image} alt={post.title} width={320} height={180} />
        </span>

        <span className={`${styles.postDetails} postDetails`}>
          <ul>
            {/* TODO: Chance into buttons linking to the blog */}
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </span>
      </Link>
    </div>
  );
};

export default PostItem;
