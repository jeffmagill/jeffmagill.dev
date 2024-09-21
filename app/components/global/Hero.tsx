import React from 'react';
import styles from './Hero.module.scss';

//
interface HeroProps {
  children: React.ReactNode;
  className?: string; // Add this line
}
const Hero: React.FC<HeroProps> = ({ children, className }) => {
  return (
    <section className={`${className} ${styles.hero}`}>
      <div className={`${styles.wrapper} wrapper`}>{children}</div>
    </section>
  );
};

export default Hero;
