import Reveal from '@/components/ui/Reveal';
import { SectionLabel, SectionHeading } from '@/components/ui/Typography';
import { administration } from '@/data/content';

export default function Administration() {
  return (
    <section className="bg-alabaster px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center max-w-lg mx-auto mb-14">
            <SectionLabel>Parish Leadership</SectionLabel>
            <SectionHeading>Administration</SectionHeading>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-7">
            {administration.map((member) => (
              <div key={`${member.name}-${member.role}`} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-sand/60 border border-gold/30 flex items-center justify-center mb-3">
                  <svg className="w-9 h-9 text-burgundy/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z" />
                  </svg>
                </div>
                <span className="block text-sm font-serif font-bold text-charcoal">
                  {member.name}
                </span>
                <span className="block text-xs text-gold uppercase tracking-wide">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
