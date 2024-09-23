import React from 'react';
import styles from './Hero.module.scss';
import HeroAnimation from './HeroAnimation';

//
interface HeroProps {
  children: React.ReactNode;
  className?: string; // Add this line
}
const Hero: React.FC<HeroProps> = ({ children, className = '' }) => {
  return (
    <section className={`${styles.hero} hero ${className}`}>
      <div className={`${styles.wrapper} wrapper`}>{children}</div>
      <HeroAnimation />
    </section>
  );
};

export default Hero;
