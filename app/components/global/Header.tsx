import Link from 'next/link';
import Navigation from './Navigation';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* RODO: add hamburger menus for mobile
      <input type='checkbox' id='navButton' />
      <label htmlFor='navButton'></label> */}
      <Navigation />
    </header>
  );
};

export default Header;
