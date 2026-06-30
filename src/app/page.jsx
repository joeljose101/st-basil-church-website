'use client';

import { useScrollY } from '@/lib/useScrollY';

import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CurveDivider from '@/components/ui/CurveDivider';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Worship from '@/components/sections/Worship';
import QuoteBlock from '@/components/sections/QuoteBlock';
import Ministries from '@/components/sections/Ministries';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';
import VicarDesk from '@/components/sections/VicarDesk';
import Administration from '@/components/sections/Administration';
import Safeguarding from '@/components/sections/Safeguarding';
import AcknowledgementOfCountry from '@/components/sections/AcknowledgementOfCountry';
import Contact from '@/components/sections/Contact';

const PALETTE = {
  burgundy: '#5A1827',
  burgundyDark: '#3A0D18',
  burgundyDarkest: '#1A0A0F',
  gold: '#C5A059',
  alabaster: '#FAFAFA',
  pearl: '#F3F1ED',
};

export default function HomePage() {
  const scrollY = useScrollY();

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero scrollY={scrollY} />

      <CurveDivider
        kind="parabola"
        fromColor={PALETTE.burgundyDark}
        toColor={PALETTE.alabaster}
        scrollY={scrollY}
        baseDepth={100}
      />
      <About />

      <CurveDivider
        kind="hyperbola"
        fromColor={PALETTE.alabaster}
        toColor={PALETTE.burgundyDark}
        scrollY={scrollY}
        baseDepth={80}
      />
      <Worship />

      <CurveDivider
        kind="parabola"
        fromColor={PALETTE.burgundyDark}
        toColor={PALETTE.burgundyDarkest}
        flip
        scrollY={scrollY}
        baseDepth={60}
      />
      <QuoteBlock />

      <CurveDivider
        kind="cubic"
        fromColor={PALETTE.burgundyDarkest}
        toColor={PALETTE.alabaster}
        scrollY={scrollY}
        baseDepth={90}
      />
      <Ministries />

      <CurveDivider
        kind="hyperbola"
        fromColor={PALETTE.alabaster}
        toColor={PALETTE.pearl}
        scrollY={scrollY}
        baseDepth={70}
      />
      <Events />

      <CurveDivider
        kind="parabola"
        fromColor={PALETTE.pearl}
        toColor={PALETTE.alabaster}
        flip
        scrollY={scrollY}
        baseDepth={70}
      />
      <Gallery />

      <VicarDesk />
      <Administration />
      <Safeguarding />
      <AcknowledgementOfCountry />

      <CurveDivider
        kind="cubic"
        fromColor={PALETTE.pearl}
        toColor={PALETTE.burgundy}
        scrollY={scrollY}
        baseDepth={90}
      />
      <Contact />

      <Footer />
    </main>
  );
}
