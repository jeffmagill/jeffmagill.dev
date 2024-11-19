// app/components/blog/ShareButtons.tsx
'use client';

import React from 'react';
import { useEffect, useState } from 'react';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faLinkedin,
	faXTwitter,
	faReddit,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import styles from './ShareButtons.module.scss';

/** interface ShareButtonsProps */
interface ShareButtonsProps {
	title: string;
}
/**
 * ShareButtons component
 *
 * Renders links to share the current page on social media
 */
const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
	let [url, setUrl] = useState('');
	const titleParam = encodeURIComponent(title);

	// get current url
	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	// create share urls for each platform
	const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
	const linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
	const xTwitterLink = `http://x.com/share?url=${url}&text=${titleParam}`;
	const redditLink = `https://reddit.com/submit?url=${url}&title=${titleParam}`;
	const emailLink = `mailto:?subject=${titleParam}&body=${url}`;

	return (
		// Button container
		<div className={styles.shareButtonList}>
			<h3>Share This Post</h3>
			<p>
				If you found this post interesting, please consider sharing it to your
				social networks.
			</p>
			{/*
        Render links for each platform
        */}
			<div className={styles.wrapper}>
				<a
					className={styles.shareButton}
					href={facebookLink}
					target='_blank'
					rel='noopener noreferrer'
				>
					<FontAwesomeIcon icon={faFacebook} aria-hidden='true' />
					<span>Share on Facebook</span>
				</a>

				<a
					className={styles.shareButton}
					href={linkedInLink}
					target='_blank'
					rel='noopener noreferrer'
				>
					<FontAwesomeIcon icon={faLinkedin} aria-hidden='true' />
					<span>Share on LinkedIn</span>
				</a>

				<a
					className={styles.shareButton}
					href={xTwitterLink}
					target='_blank'
					rel='noopener noreferrer'
				>
					<FontAwesomeIcon icon={faXTwitter} aria-hidden='true' />
					<span>Share on X</span>
				</a>

				<a
					className={styles.shareButton}
					href={redditLink}
					target='_blank'
					rel='noopener noreferrer'
				>
					<FontAwesomeIcon icon={faReddit} aria-hidden='true' />
					<span>Share on Reddit</span>
				</a>

				<a
					className={styles.shareButton}
					href={emailLink}
					target='_blank'
					rel='noopener noreferrer'
				>
					<FontAwesomeIcon icon={faEnvelope} aria-hidden='true' />
					<span>Share by Email</span>
				</a>
			</div>
		</div>
	);
};

// export the component
export default ShareButtons;
