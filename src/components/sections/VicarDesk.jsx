import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { pastVicars } from '@/data/content';

function PersonPlaceholder() {
  return (
    <div className="w-20 h-20 mx-auto rounded-full bg-sand/60 border border-gold/30 flex items-center justify-center mb-3">
      <svg className="w-9 h-9 text-burgundy/40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z" />
      </svg>
    </div>
  );
}

export default function VicarDesk() {
  return (
    <section className="bg-pearl border-y border-sand px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-14">
            <SectionLabel>From the Vicar Desk</SectionLabel>
            <SectionHeading>A Word From Our Vicar</SectionHeading>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
            <div className="lg:col-span-1">
              <div className="relative aspect-square overflow-hidden shadow-divine border-2 border-gold/40">
                <Image
                  src="/images/vicar-portrait.jpg"
                  alt="Rev. Fr. Vicar of St Basil Jacobite Syrian Orthodox Church"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-2 bg-white p-8 shadow-divine border-t-2 border-gold">
              <h3 className="font-serif text-burgundy text-xl mb-1">Rev. Fr. [Vicar Name]</h3>
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-5">
                Parish Vicar
              </span>
              <p className="text-muted font-body font-normal text-sm leading-relaxed">
                Our Vicar shepherds the parish with deep devotion to the West Syriac liturgical
                tradition, guiding the congregation through the Holy Qurbana, the sacraments, and
                the pastoral life of the church.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h4 className="text-center font-serif text-charcoal text-lg mb-9 uppercase tracking-wide">
            Past Vicars
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {pastVicars.map((vicar) => (
              <div key={vicar.years} className="text-center">
                <PersonPlaceholder />
                <span className="block text-sm font-serif font-bold text-charcoal">
                  {vicar.name}
                </span>
                <span className="block text-xs text-muted">{vicar.years}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
