import type { Metadata } from 'next';
import Link from 'next/link';
import {
  listReviewSlugs,
  readArticleHtml,
  extractTitleFromArticleHtml,
  extractMetaDescription,
  SITE_URL,
} from '@/lib/reviews';
import { ReviewCard } from '@/components/review-card';

export const metadata: Metadata = {
  title: 'Budget Travel Guides',
  description: 'Budget travel guides for Australian travellers — cheap flights, daily costs, affordable destinations and money-saving tips.',
  alternates: { canonical: `${SITE_URL}/posts` },
  openGraph: { url: `${SITE_URL}/posts` },
};

export default function PostsIndexPage() {
  const slugs = listReviewSlugs();
  const cards = slugs.map((slug) => {
    const raw = readArticleHtml(slug)!;
    return {
      slug,
      title: extractTitleFromArticleHtml(raw),
      description: extractMetaDescription(raw),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-road-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">Guides</span>
      </nav>
      <h1 className="font-display text-4xl font-semibold text-white mb-4">Budget Travel Guides</h1>
      <p className="text-slate-400 max-w-2xl mb-12">
        Practical guides for travelling on less — cheap flights from Australia, daily costs, hostels and affordable escapes from Bali to Japan and the Maldives.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <ReviewCard key={c.slug} slug={c.slug} title={c.title} description={c.description} />
        ))}
      </div>
    </div>
  );
}
