'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeroAnimation.module.scss';

interface HeroAnimationProps {
  duration?: number;
  steps?: number;
}

const HeroAnimation: React.FC<HeroAnimationProps> = ({
  duration = 32,
  steps = 100,
}) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedStartTime = localStorage.getItem('heroAnimationStartTime');
    startTimeRef.current = storedStartTime
      ? Number(storedStartTime)
      : performance.now();
    localStorage.setItem(
      'heroAnimationStartTime',
      startTimeRef.current.toString()
    );

    const animation = animationRef.current;
    if (!animation) return;

    let animationFrameId: number;

    const updateAnimation = () => {
      if (startTimeRef.current === null) return;

      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTimeRef.current) / 1000; // Convert to seconds
      const progress = ((elapsedTime % duration) / duration) * 100;

      animation.style.setProperty('--progress', progress.toString());

      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    animationFrameId = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration]);

  return (
    <div className={`${styles.heroAnimation} heroAnimation`} ref={animationRef}>
      <div className={styles.inner}></div>
    </div>
  );
};

export default HeroAnimation;
