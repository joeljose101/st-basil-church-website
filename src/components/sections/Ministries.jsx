import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { ministries } from '@/data/content';

export default function Ministries() {
  return (
    <section id="ministries" className="bg-alabaster px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-16">
            <SectionLabel>Congregation</SectionLabel>
            <SectionHeading>Parish Ministries</SectionHeading>
            <p className="text-muted font-body font-normal">
              Nurturing faith across generations through dedicated fellowships and spiritual
              education.
            </p>
          </div>
        </Reveal>

        {ministries.map((ministry, i) => (
          <Reveal key={ministry.title} delay={i * 80}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className={i % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}>
                <span className="font-serif text-burgundy text-3xl font-bold">
                  {ministry.numeral}
                </span>
                <h3 className="font-serif text-charcoal text-2xl my-3.5">{ministry.title}</h3>
                <p className="text-muted font-body font-normal leading-relaxed text-sm">
                  {ministry.body}
                </p>
              </div>
              <div className={i % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}>
                <div
                  className={`relative h-[300px] overflow-hidden ${
                    i % 2 === 0 ? 'rounded-curve-tl' : 'rounded-curve-tr'
                  }`}
                >
                  {ministry.isPlaceholder ? (
                    <div className="absolute inset-0 bg-pearl border-2 border-dashed border-sand flex items-center justify-center px-6 text-center">
                      <span className="text-xs uppercase tracking-widest text-muted">
                        Photo coming soon
                      </span>
                    </div>
                  ) : (
                    <Image src={ministry.image} alt={ministry.imageAlt} fill className="object-cover" />
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
