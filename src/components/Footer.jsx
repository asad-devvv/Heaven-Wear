export default function Footer() {
  return (
    <footer className="border-t-2 border-ink-soft mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm text-chrome">Heaven Wear</span>
        <p className="font-mono text-xs text-paper/50 uppercase tracking-wide">
          © {new Date().getFullYear()} Made by Asad.
        </p>
      </div>
    </footer>
  );
}
