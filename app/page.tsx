import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './page.module.css';
import Hero from '@/app/components/global/Hero';
import Callout from '@/app/components/global/Callout';

export const metadata: Metadata = {
  title: 'Andrew Magill: Web Developer',
  description: 'Frontend Architect and Web Development Manager',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Hero>
          <div className='heroContent'>
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

          <Image
            src='/images/portrait-andrew-magill.jpg'
            alt='Andrew Magill: Web Developer'
            className={styles.portrait}
            width={300}
            height={300}
          />
        </Hero>

        <section className={styles.serviceList}>
          <Callout
            title='Implementation Management'
            description='I help the team prioritize and execute projects on time, within budget, and exceed expectations.'
            icon='/images/icon-project.svg'
          />
          <Callout
            title='Software Engineering'
            description="I architect web applications, tailored to clients' needs and requirements."
            icon='/images/icon-engineering.svg'
          />
          <Callout
            title='Process Automation'
            description='I implement tools to allow the clients to set ambitious goals, and focus on their core business.'
            icon='/images/icon-automation.svg'
          />
        </section>
      </div>
    </main>
  );
}
