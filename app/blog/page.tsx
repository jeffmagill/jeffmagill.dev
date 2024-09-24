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
      <Hero>
        <h1>A Collection of Rants & Ramblings </h1>
        <p>
          I&apos;m reluctantly betting my time that someone will find something
          useful here.{' '}
        </p>
      </Hero>

      <section className={styles.postIndex}>
        <div className={styles.wrapper}>
          <PostList />
        </div>
      </section>
    </main>
  );
}
