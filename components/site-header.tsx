import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 font-display text-lg font-bold text-white shadow-card">
            P
          </span>
          <div className="leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-road-300 transition-colors">
              Penny Holiday
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-mist">Smart Budget Travel Guides</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/guides" className="text-slate-400 hover:text-white transition-colors">
            Guides
          </Link>
          <a
            href="https://amaldives.com"
            target="_blank"
            rel="noopener"
            className="rounded-full bg-road-500/15 px-4 py-2 text-road-300 ring-1 ring-road-500/30 hover:bg-road-500/25 transition-colors"
          >
            Full Maldives Guide →
          </a>
        </nav>
      </div>
    </header>
  );
}
