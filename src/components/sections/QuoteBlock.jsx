import Reveal from '@/components/ui/Reveal';

export default function QuoteBlock() {
  return (
    <section
      className="relative px-6 py-32 text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(26,10,15,0.86), rgba(26,10,15,0.86)), url('/images/stone-window.jpg')",
      }}
    >
      <Reveal>
        <div className="max-w-2xl mx-auto">
          <span className="text-gold text-5xl block mb-5 opacity-80">&#9775;</span>
          <blockquote className="font-serif text-pearl text-[clamp(1.5rem,3vw,2.1rem)] leading-snug mb-7">
            &ldquo;Worship the Lord in the beauty of holiness; tremble before Him, all the
            earth.&rdquo;
          </blockquote>
          <div className="w-14 h-px bg-gold mx-auto mb-5" />
          <cite className="text-[11px] tracking-[0.3em] uppercase text-gold not-italic">
            Psalm 96:9
          </cite>
        </div>
      </Reveal>
    </section>
  );
}
