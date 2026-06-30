export function SectionLabel({ children }) {
  return (
    <span className="block text-gold text-xs tracking-[0.25em] uppercase mb-3.5">
      {children}
    </span>
  );
}

export function SectionHeading({ children, dark = false, size = 'text-3xl' }) {
  return (
    <h2
      className={`font-serif font-bold ${size} leading-tight mb-7 ${
        dark ? 'text-pearl' : 'text-charcoal'
      }`}
    >
      {children}
    </h2>
  );
}
