'use client';

import { useReveal } from '@/lib/useReveal';

/**
 * Wraps children in a div that fades/lifts into view the first time
 * it crosses the viewport threshold. Styling lives in the .reveal
 * class in globals.css; this component only toggles data-visible.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
