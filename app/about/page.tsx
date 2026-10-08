import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Penny Holiday',
  description: 'About Penny Holiday — budget travel guides for Australians who want to explore the world affordably.',
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">About</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-8">
          About Penny Holiday
        </h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <div className="rounded-2xl bg-ink-900/40 px-6 py-10 shadow-card ring-1 ring-white/[0.06]">
            <p className="text-lg text-slate-200 mb-4">
              Penny Holiday publishes budget travel guides that show Australians how to explore the world
              without breaking the bank.
            </p>
            <p>
              We cover real prices, real experiences, and honest cost breakdowns — from Maldives guesthouses
              that cost less than a Sydney hotel room, to flight-booking tricks that save hundreds on long-haul
              tickets.
            </p>
          </div>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-10 mb-4">
              What we cover
            </h2>
            <p>
              Our guides focus on destinations and strategies that make travel affordable:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Budget Maldives travel — guesthouses, cheap flights, and all-inclusive resort comparisons</li>
              <li>Daily travel costs in Australian dollars for popular destinations</li>
              <li>Flight booking tactics and when to fly for the best prices</li>
              <li>Honest reviews of budget accommodation and value experiences</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-10 mb-4">
              Our approach
            </h2>
            <p>
              Every guide is fact-checked against current sources, with prices in Australian dollars where possible
              and clear citations when we reference external data. We don't invent numbers or copy old blog posts —
              if a price has changed or we can't verify it, we say so.
            </p>
          </section>

          <section className="rounded-2xl bg-terra-500/10 px-6 py-8 mt-10 border-l-4 border-terra-500">
            <h2 className="font-display text-xl font-semibold text-white mb-4">
              Get in touch
            </h2>
            <p className="mb-4">
              Questions, feedback, or partnership enquiries? We'd love to hear from you.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-full bg-terra-500 px-6 py-2.5 text-sm font-semibold text-ink-950 hover:bg-terra-400 transition-colors"
            >
              Contact us
            </Link>
          </section>

          <section className="pt-8 border-t border-white/10">
            <Link 
              href="/posts" 
              className="inline-flex items-center text-terra-400 font-medium hover:text-terra-300 transition-colors"
            >
              ← Browse all budget travel guides
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
