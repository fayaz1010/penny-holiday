import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-ink-900/50 py-12 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-8 text-sm text-slate-500">
          <div>
            <p className="font-display text-white font-medium mb-1">Penny Holiday</p>
            <p className="max-w-sm">
              Budget Maldives travel guides — guesthouse picks, cheap flight strategies, value resorts and honest cost breakdowns for every budget.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/posts" className="hover:text-slate-300 transition-colors">
              All guides
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} pennyholiday.com</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
