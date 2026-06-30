'use client';

import { useEffect, useRef, useState } from 'react';
import { buildCurvePath } from '@/lib/curves';

/**
 * Signature section-transition element. Renders a parabola, hyperbola,
 * or cubic curve between two section colors, and subtly morphs its
 * depth as it crosses the viewport while scrolling.
 *
 * Performance note: this component is instantiated 7 times on the page
 * (page.jsx). An earlier version called getBoundingClientRect() — which
 * forces a synchronous browser layout reflow — on every animation-frame
 * scroll tick, in every instance: 7 forced reflows per frame while
 * scrolling. Since this element sits in normal document flow (not
 * fixed/sticky), its distance from the top of the document is constant;
 * only its position relative to the viewport changes as the page scrolls,
 * and that's recoverable from a single initial measurement plus the
 * scrollY delta — no further layout reads needed during scroll.
 */
export default function CurveDivider({
  kind = 'parabola',
  fromColor,
  toColor,
  flip = false,
  scrollY = 0,
  baseDepth = 90,
}) {
  const ref = useRef(null);
  // documentTop: this element's top offset from the document origin,
  // measured once. Combined with the live scrollY, gives the same
  // viewport-relative "top" that getBoundingClientRect().top would
  // report, without re-measuring the DOM on every frame.
  const [documentTop, setDocumentTop] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setDocumentTop(rect.top + window.scrollY);
    };
    measure();
    // Re-measure on resize only — a resize can reflow the whole page and
    // change this element's document position, so that case still needs
    // a real DOM read. Scroll alone does not.
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const localTop =
    documentTop !== null ? documentTop - scrollY : null;

  const viewportProgress =
    localTop !== null && typeof window !== 'undefined'
      ? Math.max(-1, Math.min(1, (window.innerHeight - localTop) / window.innerHeight - 0.5))
      : 0;

  const depth = Math.max(20, baseDepth + viewportProgress * 26);
  const width = 1440;
  const height = 160;
  const path = buildCurvePath(width, height, depth, kind, flip);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '100%', height: '120px', lineHeight: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <rect x="0" y="0" width={width} height={height} fill={fromColor} />
        <path d={path} fill={toColor} />
      </svg>
    </div>
  );
}
