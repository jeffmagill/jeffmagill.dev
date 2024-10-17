import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  return (
    <nav className={`${styles.navigation} navigation`}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/blog'>Blog</Link>
        </li>
        <li>
          <Link href='/projects'>Projects</Link>
        </li>
        <li>
          <Link href='/docs/andrew-magill-developer-resume.pdf'>Resume</Link>
        </li>
        <li>
          <Link href='//github.com/andymagill'>GitHub</Link>
        </li>
        <li>
          <Link href='//www.linkedin.com/in/andrew-magill'>LinkedIn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
