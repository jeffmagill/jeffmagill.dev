import React from 'react';
import Image from 'next/image';
import styles from './Callout.module.css';

const Callout: React.FC<{
  title: string;
  description: string;
  icon: string;
}> = ({ title, description, icon }) => {
  return (
    <section className={styles.callout}>
      <Image src={icon} alt={title} width={64} height={64} />
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
};

export default Callout;
