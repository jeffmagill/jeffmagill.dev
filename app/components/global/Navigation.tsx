import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="//github.com/andymagill">GitHub</Link></li>
        <li><Link href="/docs/Resume-Andrew-Magill.pdf">Resume</Link></li>
        <li><Link href="//www.linkedin.com/in/andrew-magill">LinkedIn</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;