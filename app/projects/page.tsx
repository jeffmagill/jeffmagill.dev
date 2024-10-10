/**
 * Projects Page
 *
 */
import type { Metadata } from 'next';

import { settings } from '@/utils/settings.mjs';
import Hero from '@/app/components/global/Hero';
import ProjectList from '@/app/components/projects/ProjectList';
import styles from './page.module.scss';

const meta = {
  title: 'Web Projects and Development Work - ' + settings.title,
  description: 'A collection of projects and development work by Andrew Magill',
  url: `${settings.siteUrl}/projects/`,
};

export const metadata: Metadata = {
  title: settings.title,
  description: settings.description,
  openGraph: {
    title: settings.title,
    description: settings.description,
    type: 'website',
    url: meta.url,
  },
  twitter: {
    title: settings.title,
    description: settings.description,
  },
};

export default function Projects() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Hero>
          <h1>Web Projects and Development Work </h1>
          <p>
            Some of the bigger and better projects that I&apos;ve developed over
            the years.
          </p>
        </Hero>

        {/* All Projects */}
        <section className={`${styles.allProjects} allProjects`}>
          <div className={`${styles.wrapper} wrapper`}>
            <ProjectList />
          </div>
        </section>
      </div>
    </main>
  );
}
