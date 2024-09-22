/**
 * Home Page
 *
 */

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.scss';
import Hero from '@/app/components/global/Hero';
import Callout from '@/app/components/global/Callout';
import PostList from '@/app/components/blog/PostList';

// Define the metadata for the page
export const metadata: Metadata = {
  title: 'Andrew Magill: Web Developer',
  description: 'Frontend Architect and Web Development Manager',
};

export default function Home() {
  return (
    <main className={`${styles.main} main`}>
      <div className={`${styles.wrapper} wrapper`}>
        <Hero className='row'>
          {/* Portrait */}
          <Image
            src='/images/portrait-andrew-magill.jpg'
            alt='Andrew Magill: Web Engineer'
            className={`${styles.portrait} portrait`}
            width={300}
            height={300}
          />

          {/* Homepage Intro */}
          <div className={`${styles.homeIntro} homeIntro`}>
            <h1>
              <strong>Hey there, I’m Andrew&nbsp;Magill.</strong> I’m a
              web&nbsp;engineer with{' '}
              <Link href='//www.linkedin.com/in/andrew-magill'>
                deep&nbsp;experience
              </Link>{' '}
              building{' '}
              <Link href='https://github.com/andymagill'>
                custom&nbsp;websites & applications
              </Link>
              .
            </h1>{' '}
            <p>
              I’m currently working as lead developer at{' '}
              <Link href='https://www.prehealth.com'>Prehealth</Link>. I love{' '}
              <Link href='/blog'>new&nbsp;challenges</Link> and interesting{' '}
              opportunities. I built this site to showcase{' '}
              <Link href='/projects'>some of my&nbsp;work</Link>.{' '}
            </p>
          </div>
        </Hero>

        {/* Key Skills */}
        <section className={`${styles.serviceList} serviceList`}>
          <h2>Key Skills</h2>
          <div className={`${styles.wrapper} wrapper row`}>
            <Callout
              title='Engineering Management'
              description='I help teams execute engineering projects that address complex challenges and exceed expectations.'
              icon='/images/icon-project.svg'
            />
            <Callout
              title='Software Development'
              description='I architect web applications that elegantly translate ambitious goals into scalable solutions.'
              icon='/images/icon-engineering.svg'
            />
            <Callout
              title='Process Automation'
              description='I implement tools that enable teams to focus on their core business and strategic objectives.'
              icon='/images/icon-automation.svg'
            />
          </div>
        </section>

        <section className={`${styles.featuredPosts} featuredPosts`}>
          <div className={`${styles.wrapper} wrapper row`}>
            <h2>Featured Rants </h2>
            <PostList maxPosts={3} />
          </div>
        </section>

        {/* TODO: add recent projects component */}
      </div>
    </main>
  );
}
