import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { serviceSchedule } from '@/data/content';

export default function Worship() {
  return (
    <section id="worship" className="bg-burgundy-dark px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-14">
            <SectionLabel>Divine Liturgy</SectionLabel>
            <SectionHeading dark size="text-[1.9rem]">
              Sunday Service Schedule
            </SectionHeading>
            <p className="text-pearl/65 font-body font-normal">
              Experience the beauty of heavenly worship. The doors of our sanctuary are open to
              all who seek peace.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceSchedule.map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="bg-pearl/[0.05] border border-gold/20 rounded-curve-tl px-5 py-9 text-center h-full">
                <span className="font-serif text-3xl text-gold block">{item.time}</span>
                <span className="text-[10px] text-pearl/40 tracking-[0.2em] uppercase">
                  {item.period}
                </span>
                <h3 className="font-serif text-pearl text-sm mt-4">{item.label}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
