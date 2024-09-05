import Link from 'next/link';
import Navigation from './Navigation';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};

export default Header;
