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
      <div className='{styles.wrapper} ta-center'>
        <Image src={icon} alt={title} width={48} height={48} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default Callout;
