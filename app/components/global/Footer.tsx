import React from 'react';
import Navigation from './Navigation';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Navigation />

      <div className={styles.copyright}>
        <p>Copyright © {new Date().getFullYear()}, Andrew Magill. All other copyrighted materials are property of their respective copyright holders.<br />
        Original work licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" >Creative Commons BY-SA 4.0</a></p>
      </div>
    </footer>
  );
};

export default Footer;