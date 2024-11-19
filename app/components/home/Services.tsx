import React from 'react';
import styles from './Services.module.css';

const Services: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<section className={styles.services}>
			<div className={styles.wrapper}>{children}</div>
		</section>
	);
};

export default Services;
