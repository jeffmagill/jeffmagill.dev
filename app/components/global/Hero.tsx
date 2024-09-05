import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>{children}</div>
    </section>
  );
};

export default Hero;
