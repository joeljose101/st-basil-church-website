'use client';

export default function Hero({ scrollY }) {
  const parallaxBgY = scrollY * 0.35;
  const parallaxContentY = scrollY * 0.12;
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <header
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-burgundy-dark"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cathedral-light.jpg')",
          transform: `translateY(${parallaxBgY}px) scale(1.15)`,
          opacity: 0.45,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark via-burgundy-dark/80 to-burgundy-dark/30" />

      <div
        className="relative z-[2] max-w-3xl px-6 text-center"
        style={{ transform: `translateY(${parallaxContentY}px)`, opacity }}
      >
        <div className="text-gold text-4xl mb-5">&#9775;</div>
        <span className="text-gold text-sm tracking-[0.3em] uppercase block mb-5">
          Coburg North &middot; Melbourne
        </span>
        <h1 className="font-serif text-pearl font-bold text-[clamp(2.4rem,6vw,4.2rem)] leading-tight mb-7">
          A Sanctuary of <br />
          <span className="text-gold italic font-body font-normal">Apostolic Faith</span>
        </h1>
        <p className="text-pearl/85 text-lg leading-relaxed max-w-lg mx-auto mb-11 font-normal">
          Preserving the West Syriac liturgical tradition of the Syriac Orthodox Patriarchate of
          Antioch &mdash; a welcoming spiritual home for generations.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#worship"
            className="bg-gold text-burgundy-dark px-9 py-4 font-serif font-bold text-sm tracking-widest uppercase no-underline"
          >
            Service Times
          </a>
          <a
            href="#contact"
            className="bg-transparent border border-pearl/60 text-pearl px-9 py-4 font-serif font-bold text-sm tracking-widest uppercase no-underline"
          >
            Visit Our Parish
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 text-pearl/55 text-[10px] tracking-[0.2em] uppercase"
        style={{ opacity }}
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </header>
  );
}
