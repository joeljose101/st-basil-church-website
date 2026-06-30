import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { heritageCards } from '@/data/content';

export default function About() {
  return (
    <section id="about" className="bg-alabaster px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <Reveal>
            <SectionLabel>Our Heritage</SectionLabel>
            <SectionHeading>
              Ancient Faith,
              <br />
              Living Tradition
            </SectionHeading>
            <p className="text-muted font-body font-normal leading-relaxed mb-4">
              The Jacobite Syrian Christian Church traces its roots to the evangelistic mission
              of St. Thomas the Apostle, who, according to tradition, brought Christianity to
              India in AD 52. The Church follows the West Syriac liturgical tradition and remains
              in communion with the Syriac Orthodox Patriarchate of Antioch.
            </p>
            <p className="text-muted font-body font-normal leading-relaxed">
              Dedicated to St. Baselios Yeldho Bava, whose holy tomb rests at Mar Thoma
              Cheriyapally, Kothamangalam, our parish draws inspiration from his life of humility,
              prayer, and steadfast faith.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative rounded-curve-tl overflow-hidden h-[380px]">
              <Image
                src="/images/cathedral-interior.jpg"
                alt="Ornate sanctuary interior with stained glass"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative rounded-curve-tr overflow-hidden h-[340px]">
              <Image
                src="/images/community-group.jpg"
                alt="St Basil parish community gathered outside the church"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150} className="order-1 lg:order-2">
            <SectionLabel>Our Story</SectionLabel>
            <SectionHeading>A Family Built on Gratitude</SectionHeading>
            <p className="text-muted font-body font-normal leading-relaxed mb-4">
              With gratitude to Almighty God, we thank Him for His abundant blessings upon St.
              Basil Jacobite Syrian Orthodox Church, Melbourne. Through His grace, our parish has
              become a place where families gather to worship, grow in faith, and support one
              another.
            </p>
            <p className="text-muted font-body font-normal leading-relaxed">
              As we continue our journey, we pray that God will strengthen our parish and help us
              serve future generations with love, unity, and compassion.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heritageCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <div className="bg-pearl border border-sand rounded-curve-tl px-8 py-10 text-center h-full">
                <div className="text-gold text-3xl mb-4">{card.icon}</div>
                <h3 className="font-serif text-burgundy text-lg mb-3">{card.title}</h3>
                <p className="text-muted text-sm font-body font-normal leading-relaxed">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
