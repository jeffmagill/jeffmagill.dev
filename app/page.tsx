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

// Define the metadata for the page
export const metadata: Metadata = {
  title: 'Andrew Magill: Web Developer',
  description: 'Frontend Architect and Web Development Manager',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Hero>
          {/* Portrait */}
          <Image
            src='/images/portrait-andrew-magill.jpg'
            alt='Andrew Magill: Web Developer'
            className={styles.portrait}
            width={300}
            height={300}
          />

          {/* Homepage Intro */}
          <div className='homeIntro'>
            <h1>
              <strong>Hey there, I’m Andrew&nbsp;Magill.</strong> I’m a
              web&nbsp;engineer and lead&nbsp;developer with{' '}
              <Link href='//www.linkedin.com/in/andrew-magill'>
                deep&nbsp;experience
              </Link>{' '}
              building <Link href='/projects'>custom&nbsp;websites</Link> and{' '}
              <Link href='https://github.com/andymagill'>
                web&nbsp;applications
              </Link>
              .
            </h1>{' '}
            I’m currently looking for{' '}
            <Link href='/blog'>new&nbsp;challenges</Link> and interesting
            opportunities. I built this page to showcase{' '}
            <Link href='/projects'>some of my&nbsp;work</Link>.
          </div>
        </Hero>

        {/* // Key Skills */}
        <section className={styles.serviceList}>
          <h2>Key Skills</h2>
          <div className='wrapper'>
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

          {/* TODO: add featured posts component */}
          {/* TODO: add recent projects component */}
        </section>
      </div>
    </main>
  );
}
