/**
 * Home Page
 *
 */

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import Hero from '@/app/components/global/Hero';
import Callout from '@/app/components/global/Callout';
import PostList from '@/app/components/blog/PostList';
import ProjectList from '@/app/components/projects/ProjectList';

import styles from './page.module.scss';

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
          <div className={`${styles.portraitContainer} portraitContainer`}>
            <Image
              src='/images/portrait-andrew-magill.jpg'
              alt='Andrew Magill: Web Engineer'
              className={`${styles.portrait} portrait`}
              width={300}
              height={300}
            />
          </div>

          {/* Homepage Intro */}
          <div className={`${styles.homeIntro} homeIntro`}>
            <h1>
              <strong>Hey there, I’m Andrew&nbsp;Magill.</strong> I’m a
              web&nbsp;engineer with{' '}
              <Link href='//www.linkedin.com/in/andrew-magill'>
                deep&nbsp;experience
              </Link>{' '}
              building{' '}
              <Link href='//github.com/andymagill'>
                custom&nbsp;websites & applications
              </Link>
              .
            </h1>{' '}
            <p>
              I’m currently working as lead developer at{' '}
              <Link href='//www.prehealth.com'>Prehealth</Link>. I love{' '}
              <Link href='/blog'>new&nbsp;challenges</Link> and interesting{' '}
              opportunities. I built this website <em>from scratch</em> to
              showcase{' '}
              <Link href='/projects'>some of my&nbsp;best&nbsp;work</Link>.{' '}
            </p>
          </div>
        </Hero>

        {/* Key Skills */}
        <section className={`${styles.serviceList} serviceList`}>
          <div className={`${styles.wrapper} wrapper`}>
            <h2>Key Skills</h2>
            <p>
              Here are some of my key capabilities that deliver tangible results for my clients and projects.{' '}
            </p>
            <div className={`${styles.calloutContainer} calloutContainer`}>
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
          </div>
        </section>

        {/* Recent Posts */}
        <section className={`${styles.recentPosts} recentPosts`}>
          <div className={`${styles.wrapper} wrapper`}>
            <h2>Recent Rants </h2>
            <p>Thoughts that I may one day wonder why I bothered writing. </p>
            <PostList maxPosts={3} />
            <p>
              <Link href='/blog'>View All Posts</Link>
            </p>
          </div>
        </section>

        {/* Featured Projects */}
        <section className={`${styles.featuredProjects} featuredProjects`}>
          <div className={`${styles.wrapper} wrapper`}>
            <h2>Featured Projects </h2>
            <p>Some of my greatest hits that were pretty cool at some point</p>
            <ProjectList maxProjects={3} />
            <p>
              <Link href='/projects'>View All Projects</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
