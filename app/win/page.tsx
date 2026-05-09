'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRIZE = {
  name: 'Maldives Escape for Two',
  value: '$4,800',
  includes: [
    '7 nights at a Maldives 4-star resort (twin share)',
    'Return flights from your nearest Australian capital',
    'Airport speedboat transfer included',
    'Daily breakfast for two',
  ],
  drawDate: 'Saturday 28 June 2026',
  entryClose: 'Friday 27 June 2026 at 11:59 PM AEST',
  terms: [
    'Open to Australian residents aged 18 and over.',
    'One entry per person. Duplicate entries will be disqualified.',
    'Winner selected by random draw on ' + 'Saturday 28 June 2026' + '.',
    'Prize is non-transferable and non-redeemable for cash.',
    'Travel dates subject to availability — blackout dates may apply.',
    'Promoter: Penny Holiday (Australia). Full T&Cs available on request.',
  ],
};

export default function WinPage() {
  const [step, setStep] = useState<'enter' | 'done'>('enter');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', newsletter: true });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/enter-win', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Still show success
    }
    setLoading(false);
    setStep('done');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">Win a Maldives Holiday</span>
      </nav>

      {step === 'done' ? (
        <div className="mx-auto max-w-xl text-center py-20">
          <div className="text-6xl mb-6">🏝️</div>
          <h1 className="font-display text-3xl font-semibold text-white mb-4">You&apos;re in the draw!</h1>
          <p className="text-slate-400 text-lg mb-8">
            Good luck, <strong className="text-white">{form.name}</strong>. We&apos;ll email you at {form.email} if you win.
            The draw happens on <strong className="text-white">{PRIZE.drawDate}</strong>.
          </p>
          <Link href="/posts" className="inline-flex rounded-full bg-road-500 px-8 py-3 text-sm font-semibold text-ink-950 hover:bg-road-400 transition-colors">
            Browse budget Maldives guides
          </Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* Prize details */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
              🎁 Free giveaway · No purchase required
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Win a Maldives Holiday for Two
            </h1>
            <div className="text-3xl font-display font-semibold text-road-300 mb-6">
              Prize valued at {PRIZE.value}
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Enter your details for a chance to win a 7-night Maldives escape for two — flights, resort and transfers included. No credit card, no purchase, no catch.
            </p>

            <div className="rounded-2xl border border-white/10 bg-ink-800/40 p-6 mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400 mb-4">What&apos;s included</h2>
              <ul className="space-y-2">
                {PRIZE.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-road-400 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-white/10 bg-ink-800/30 p-4">
                <div className="text-xs text-slate-500 mb-1">Entries close</div>
                <div className="text-sm text-white font-medium">{PRIZE.entryClose}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-ink-800/30 p-4">
                <div className="text-xs text-slate-500 mb-1">Draw date</div>
                <div className="text-sm text-white font-medium">{PRIZE.drawDate}</div>
              </div>
            </div>

            <details className="rounded-xl border border-white/10 bg-ink-800/30 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-300">Terms &amp; conditions</summary>
              <ul className="mt-3 space-y-2">
                {PRIZE.terms.map((t, i) => (
                  <li key={i} className="text-xs text-slate-500 flex gap-2">
                    <span className="shrink-0">{i + 1}.</span>
                    {t}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Entry form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-road-500/30 bg-ink-800/60 p-7">
              <h2 className="font-display text-2xl font-semibold text-white mb-1">Enter the draw</h2>
              <p className="text-sm text-slate-400 mb-6">Free entry. Australian residents only.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-road-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email address *</label>
                  <input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-road-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phone (optional)</label>
                  <input
                    type="tel"
                    placeholder="+61 4xx xxx xxx"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-road-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nearest city *</label>
                  <select
                    required
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-2.5 text-sm text-white focus:border-road-500 focus:outline-none"
                  >
                    <option value="">Select your city</option>
                    {['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Darwin', 'Hobart', 'Other'].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.newsletter}
                    onChange={(e) => setForm((f) => ({ ...f, newsletter: e.target.checked }))}
                    className="mt-0.5 accent-road-500"
                  />
                  <span className="text-xs text-slate-400">
                    Keep me updated with budget Maldives deals and future giveaways (optional, unsubscribe anytime)
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-road-500 py-3.5 text-sm font-bold text-ink-950 hover:bg-road-400 transition-colors disabled:opacity-60"
                >
                  {loading ? 'Entering…' : 'Enter the draw — it\'s free'}
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  We do not sell your details. One entry per person.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
