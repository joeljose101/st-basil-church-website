export default function Footer() {
  return (
    <footer className="bg-charcoal text-pearl/60 pt-16 pb-9 px-6 text-center">
      <div className="text-gold text-2xl mb-2.5">&#9775;</div>
      <div className="font-serif text-pearl tracking-widest mb-6 text-base">
        ST. BASIL JACOBITE SYRIAN ORTHODOX CHURCH
      </div>
      <p className="text-xs">
        &copy; {new Date().getFullYear()} St Basil Jacobite Syrian Orthodox Church, Melbourne.
      </p>
    </footer>
  );
}
