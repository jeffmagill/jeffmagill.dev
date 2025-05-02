'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './NavButton.module.scss';

const NavButton: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		const header = document.getElementById('header');

		const handleClick = () => {
			if (inputRef.current && inputRef.current.checked) {
				header?.style.setProperty('--header-space', '100px');
			}
		};

		if (header) {
			header.addEventListener('click', handleClick);
		}

		return () => {
			if (header) {
				header.removeEventListener('click', handleClick);
			}
		};
	}, []);

	useEffect(() => {
		// Uncheck the input when the pathname changes
		if (inputRef.current) {
			inputRef.current.checked = false;
		}

		// Reset the header space
		const header = document.getElementById('header');
		if (header) {
			header.style.setProperty('--header-space', '');
		}
	}, [pathname]);

	return (
		<>
			<input
				className={styles.navButton}
				type='checkbox'
				id='navButton'
				ref={inputRef}
			/>
			<label className={styles.navButtonIcon} htmlFor='navButton'>
				{/* TODO: change the mobile button to something more recognizable */}
				<FontAwesomeIcon icon={faBars} />
			</label>
		</>
	);
};

export default NavButton;
