import Image from 'next/image';
import type { Metadata } from 'next';
import Hero from '@/app/components/global/Hero';
import PostList from '@/app/components/blog/PostList';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Rants & Ramblings by Andrew Magill(Web Developer)',
  description:
    'A Collection of Rants and Ramblings by web developer, Andrew Magill',
};

export default function Projects() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Hero>
          <h1>A Collection of Rants & Ramblings </h1>
        </Hero>
        <PostList />
      </div>
    </main>
  );
}
