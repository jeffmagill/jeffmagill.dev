'use client';

import React, { useEffect, useRef } from 'react';
import styles from './HeroAnimation.module.scss';

interface Item {
  x: number;
  y: number;
  blur: number;
  radius: number;
  initialXDirection: number;
  initialYDirection: number;
  initialBlurDirection: number;
  colorOne: string;
  colorTwo: string;
  gradient: [number, number, number, number];
}

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {}, []);

  return (
    <div className={`${styles.heroAnimation} heroAnimation`}>
      <div className={styles.inner}></div>
    </div>
  );
};

export default HeroAnimation;
