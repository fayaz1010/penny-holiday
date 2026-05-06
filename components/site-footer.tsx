import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-ink-900/50 py-12 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-8 text-sm text-slate-500">
        <div>
          <p className="font-display text-white font-medium mb-1">Penny Holiday</p>
          <p className="max-w-sm">
            Budget Maldives travel guides — guesthouses, cheap flights, all-inclusive comparisons, and how to go for less.
          </p>
          <a
            href="https://amaldives.com"
            target="_blank"
            rel="noopener"
            className="inline-block mt-3 text-road-400 hover:text-road-300 transition-colors"
          >
            Explore all Maldives guides on amaldives.com →
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/guides" className="hover:text-road-400 transition-colors">
            All guides
          </Link>
          <a href="https://amaldives.com" target="_blank" rel="noopener" className="hover:text-road-400 transition-colors">
            amaldives.com
          </a>
          <span>© {new Date().getFullYear()} pennyholiday.com</span>
        </div>
      </div>
    </footer>
  );
}
