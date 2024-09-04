import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/portfolio">Portfolio</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;