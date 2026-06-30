import Reveal from '@/components/ui/Reveal';

export default function Safeguarding() {
  return (
    <section className="bg-burgundy text-pearl px-6 py-20">
      <Reveal>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-gold text-3xl block mb-4">&#9775;</span>
          <h2 className="font-serif text-2xl font-bold mb-6">Safeguarding</h2>
          <p className="text-pearl/80 font-body font-normal leading-relaxed text-sm mb-4">
            At St. Basil Jacobite Syrian Orthodox Church, Melbourne, the safety, dignity, and
            wellbeing of every person are our highest priorities. We are committed to creating a
            welcoming and secure environment for all members of our parish.
          </p>
          <p className="text-pearl/80 font-body font-normal leading-relaxed text-sm mb-6">
            Safeguarding is a shared responsibility. We encourage everyone within our church
            community to remain vigilant and to report any concerns about abuse, neglect, or
            exploitation.
          </p>
          <p className="text-xs text-gold uppercase tracking-widest">
            To report a safeguarding concern, please contact the Parish Safeguarding Team via the
            details below.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
