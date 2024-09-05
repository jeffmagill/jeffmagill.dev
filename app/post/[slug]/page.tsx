import Image from 'next/image';
import type { Metadata } from 'next';
import Hero from '@/app/components/global/Hero';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function Post() {
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
