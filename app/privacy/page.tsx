import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Penny Holiday — how we handle your information.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">Privacy Policy</span>
      </nav>

      <div className="prose-legal mx-auto max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p className="text-slate-400 text-sm">
            Last updated: 8 October 2026
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Who we are
            </h2>
            <p>
              This website is operated by <strong className="text-white">[TODO: Business name and ABN]</strong>.
              Our website address is <a href="https://pennyholiday.com" className="text-terra-400 hover:text-terra-300">https://pennyholiday.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              What information we collect
            </h2>
            <p>
              Penny Holiday is a content website. We do not currently operate forms that collect personal information,
              run analytics tracking, or use cookies beyond what is strictly necessary for the site to function.
            </p>
            <p>
              In the past, we ran a giveaway (closed 27 June 2026) that collected name, email, phone number, and city
              from Australian residents who entered. That promotion is closed and no longer accepts entries.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              How we use your information
            </h2>
            <p>
              If you previously entered our giveaway, we used your information solely to contact the winner and
              administer the prize. We do not share or sell personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Third-party services
            </h2>
            <p>
              This site is hosted on GitHub Pages. GitHub may collect technical information such as IP addresses
              for security and performance purposes. See{' '}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" 
                 className="text-terra-400 hover:text-terra-300"
                 target="_blank" 
                 rel="noopener noreferrer">
                GitHub's Privacy Statement
              </a>{' '}
              for details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Your rights
            </h2>
            <p>
              If you have previously provided personal information to us and wish to access, correct, or delete it,
              please contact us at <strong className="text-white">[TODO: Contact email]</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Changes to this policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with
              an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Contact us
            </h2>
            <p>
              If you have questions about this privacy policy, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Email: <strong className="text-white">[TODO: Contact email]</strong></li>
              <li>Postal address: <strong className="text-white">[TODO: Postal address]</strong></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
