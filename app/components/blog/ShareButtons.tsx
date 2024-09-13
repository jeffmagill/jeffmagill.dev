// app/components/blog/ShareButtons.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faLinkedin,
  faXTwitter,
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
 * Renders links to share the current page on Reddit, Facebook, and LinkedIn
 */
const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const path = usePathname();
  const titleParam = encodeURIComponent(title);

  // get the current path and hostname
  let url;
  if (path && window.location.href) {
    // url = new URL(path, window.location.href);
    url = 'https://magill.dev';
  } else {
    url = '';
  }

  // share urls for each platform
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
  const xTwitterLink = `http://x.com/share?url=${url}&text=${titleParam}`;
  const emailLink = `mailto:?subject=${titleParam}&body=${url}`;

  return (
    // button container
    <div className={styles.shareButtonList}>
      <h3>Share This Post</h3>
      <p>If you found this post interesting, please consider sharing this post to your social networks.</p>
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
          href={emailLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faEnvelope} aria-hidden='true' />
          <span>Share on Email</span>
        </a>
      </div>
    </div>
  );
};

// Export the ShareButtons component as the default export
export default ShareButtons;
