'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks window.scrollY, throttled to one update per animation frame.
 * Used to drive parallax offsets and curve-divider morphing.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = null;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return scrollY;
}
