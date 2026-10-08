import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Penny Holiday.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">Terms of Use</span>
      </nav>

      <div className="prose-legal mx-auto max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-8">
          Terms of Use
        </h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p className="text-slate-400 text-sm">
            Last updated: 8 October 2026
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using pennyholiday.com (the "Site"), you accept and agree to be bound by these
              Terms of Use. If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Use of Content
            </h2>
            <p>
              The content on this Site, including text, images, and guides, is provided for informational purposes
              only. While we strive to ensure accuracy, travel information — prices, schedules, regulations — changes
              frequently. Always verify details with official sources before making travel decisions or bookings.
            </p>
            <p>
              You may not reproduce, distribute, or republish content from this Site without permission, except for
              personal, non-commercial use.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              External Links
            </h2>
            <p>
              This Site may contain links to third-party websites. We are not responsible for the content, accuracy,
              or practices of external sites. Clicking external links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Disclaimer of Warranties
            </h2>
            <p>
              The Site and its content are provided "as is" without warranties of any kind, either express or implied.
              We do not guarantee that the Site will be error-free, uninterrupted, or free from viruses or other
              harmful components.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Penny Holiday and its operators shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of the Site or reliance on its
              content, including but not limited to travel decisions, bookings, or financial losses.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Governing Law
            </h2>
            <p>
              These Terms of Use are governed by the laws of Australia. Any disputes arising from these terms or
              your use of the Site will be subject to the exclusive jurisdiction of the courts of{' '}
              <strong className="text-white">[TODO: State/Territory]</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Use from time to time. Changes will be posted on this page with an
              updated "Last updated" date. Your continued use of the Site after changes are posted constitutes
              acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mt-8 mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Use, please{' '}
              <Link href="/contact" className="text-terra-400 hover:text-terra-300">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
