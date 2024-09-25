'use client';

//  /app/components/global/Header.tsx
import { useEffect } from 'react';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

// NavButton styles
import styles from './NavButton.module.scss';

const NavButton: React.FC = () => {
  useEffect(() => {
    const header = document.getElementById('header');

    // Adding client-side click event handler
    if (header) {
      header.addEventListener('click', () => {
        const input = Array.from(header.querySelectorAll('input')).find(
          (el) => el.getAttribute('checked') === 'true'
        );

        if (input) {
          header.style.setProperty('--header-space', '100px');
        }
      });
    }

    // Clean up the event listener on component unmount
    return () => {
      if (header) {
        header.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <>
      <input className={styles.navButton} type='checkbox' id='navButton' />
      <label className={styles.navButtonIcon} htmlFor='navButton'>
        <FontAwesomeIcon icon={faDirections} />
      </label>
    </>
  );
};

export default NavButton;
