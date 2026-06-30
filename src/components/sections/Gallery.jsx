'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { galleryItems, galleryFilters } from '@/data/content';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const visible =
    filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="bg-alabaster px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-10">
            <SectionLabel>Visual Journey</SectionLabel>
            <SectionHeading>Church Gallery</SectionHeading>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex gap-2.5 justify-center flex-wrap mb-11" role="group" aria-label="Filter gallery by category">
            {galleryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full border transition-colors ${
                  filter === f
                    ? 'bg-gold border-gold text-burgundy-dark'
                    : 'border-sand text-muted hover:border-gold'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Visually hidden live region: announces the filter result count to screen
            reader users, since the visual-only cue (grid re-rendering) is silent
            without it. sr-only is a Tailwind utility that hides visually but keeps
            the text in the accessibility tree. */}
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? 'photo' : 'photos'}
          {filter !== 'all' ? ` in ${filter}` : ''}.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {visible.map((item, i) => (
            <Reveal key={item.image} delay={i * 70}>
              <div
                className={`relative h-[200px] overflow-hidden ${
                  i % 3 === 1 ? 'rounded-curve-tr' : 'rounded-curve-tl'
                }`}
              >
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
