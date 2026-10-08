import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Penny Holiday — questions, feedback, or partnership enquiries.',
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">Contact</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-8">
          Contact Us
        </h1>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section className="rounded-2xl bg-ink-900/40 px-6 py-8 shadow-card ring-1 ring-white/[0.06]">
            <h2 className="font-display text-xl font-semibold text-white mb-4">
              Get in touch
            </h2>
            <p className="mb-6">
              We'd love to hear from you. Whether you have questions about budget travel, feedback on our guides,
              or partnership enquiries, reach out to us:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-terra-400 font-semibold">Email:</span>
                <span className="text-white font-medium">[TODO: Contact email]</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-terra-400 font-semibold">Address:</span>
                <span className="text-white font-medium">[TODO: Postal address]</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-ink-900/40 px-6 py-8 shadow-card ring-1 ring-white/[0.06]">
            <h2 className="font-display text-xl font-semibold text-white mb-4">
              Giveaway enquiries
            </h2>
            <p>
              Our Maldives Escape for Two giveaway closed on 27 June 2026. If you entered and believe you have not
              heard from us, please email us with your entry details and we will check our records.
            </p>
          </section>

          <section className="rounded-2xl bg-ink-900/40 px-6 py-8 shadow-card ring-1 ring-white/[0.06]">
            <h2 className="font-display text-xl font-semibold text-white mb-4">
              About Penny Holiday
            </h2>
            <p>
              Penny Holiday publishes budget travel guides to help Australians explore the world affordably.
              From Maldives guesthouses to cheap flights, we cover real prices, real experiences, and honest
              breakdowns for every budget.
            </p>
            <Link 
              href="/posts" 
              className="inline-block mt-4 text-terra-400 font-medium hover:text-terra-300 transition-colors"
            >
              Browse all guides →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
