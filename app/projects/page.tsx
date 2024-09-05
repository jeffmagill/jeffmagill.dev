import Image from 'next/image';
import type { Metadata } from 'next';
import Hero from '@/app/components/global/Hero';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Andrew Magill: Web Projects and Development Work',
  description: 'A collection of projects and development work by Andrew Magill',
};

export default function Projects() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Hero>
          <h1>Web Projects and Development Work </h1>
        </Hero>
      </div>
    </main>
  );
}
