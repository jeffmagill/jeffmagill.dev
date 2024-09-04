import React from 'react';
import styles from './Callout.module.css';

const Callout: React.FC<{ title: string; description: string; icon: string }> = ({
  title,
  description,
  icon,
}) => {
  return (
    <section className={styles.callout}>
      <div className={styles.wrapper}>
        <img src={icon} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default Callout;
