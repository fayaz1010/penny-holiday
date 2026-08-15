import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * The giveaway is CLOSED.
 *
 * This page used to keep collecting name, email, phone and city from
 * Australian residents for a draw whose entries closed on 27 June 2026 — and
 * the entries went nowhere, because /api/enter-win POSTs to WIN_WEBHOOK_URL
 * and that variable is not set. It printed "You're in the draw!" regardless.
 *
 * Collecting personal details for a promotion that has already been drawn is
 * a misrepresentation, so the form is gone. The URL stays (it has inbound
 * links and is in the sitemap) and now states plainly that entries are closed.
 * Do not re-enable the form without a live draw AND a working destination for
 * the entries.
 */

const PRIZE = {
  name: 'Maldives Escape for Two',
  drawDate: 'Saturday 28 June 2026',
  entryClose: 'Friday 27 June 2026 at 11:59 PM AEST',
};

export const metadata: Metadata = {
  title: 'Maldives giveaway — entries closed | Penny Holiday',
  description:
    'Our Maldives Escape for Two giveaway closed on 27 June 2026 and is no longer accepting entries.',
  robots: { index: false, follow: true },
};

export default function WinPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">Maldives giveaway</span>
      </nav>

      <div className="mx-auto max-w-2xl text-center py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Entries closed
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-5">
          The {PRIZE.name} giveaway has closed
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed mb-4">
          Entries closed on <strong className="text-white">{PRIZE.entryClose}</strong> and the draw
          took place on <strong className="text-white">{PRIZE.drawDate}</strong>. We are no longer
          accepting entries, and this page no longer collects any personal details.
        </p>

        <p className="text-slate-500 text-sm mb-10">
          If you entered and believe you have not heard from us, please get in touch and we will
          check our records.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/posts"
            className="inline-flex justify-center rounded-full bg-road-500 px-8 py-3 text-sm font-semibold text-ink-950 hover:bg-road-400 transition-colors"
          >
            Browse budget Maldives guides
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
