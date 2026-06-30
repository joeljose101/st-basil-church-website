'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@/data/content';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and return focus to the toggle button.
  // Without this, a keyboard user can open the menu but has no non-mouse way
  // to dismiss it short of tabbing through every link.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] border-b border-gold/20 backdrop-blur-md transition-colors duration-300 ${
        // bg-burgundy-dark/80 (not /55) at rest: measured contrast for pearl/90 text
        // against this background, even behind the brightest part of the hero photo,
        // stays above the WCAG AA 4.5:1 threshold for normal-size text. /55 measured
        // below threshold (3.73:1) in the worst case and has been corrected.
        scrolled ? 'bg-burgundy-dark/95' : 'bg-burgundy-dark/80'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 lg:h-22 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 no-underline">
          <Image
            src="/images/parish-crest.png"
            alt="St Basil Jacobite Syrian Orthodox Church crest"
            width={44}
            height={44}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif text-gold font-bold text-lg tracking-widest leading-tight">
              ST. BASIL
            </span>
            <span className="text-[10px] text-pearl/80 tracking-[0.15em] uppercase">
              Jacobite Syrian Orthodox
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-pearl/90 hover:text-gold text-sm tracking-wide uppercase no-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-gold text-gold hover:bg-gold hover:text-burgundy-dark px-5 py-2.5 text-xs font-bold tracking-widest uppercase no-underline transition-colors"
          >
            Visit Us
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden text-gold"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden bg-burgundy-dark px-6 pt-5 pb-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-pearl py-3 text-sm tracking-widest uppercase no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-block mt-3 border border-gold text-gold px-7 py-3 text-xs font-bold tracking-widest uppercase no-underline"
          >
            Visit Us
          </a>
        </div>
      )}
    </nav>
  );
}
