import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  listReviewSlugs,
  readArticleHtml,
  readSavedMeta,
  extractTitleFromArticleHtml,
  extractMetaDescription,
  extractBodyInner,
  rewriteMediaSources,
  stripFirstH1,
  ensureH2Ids,
  extractH2Toc,
  SITE_URL,
} from '@/lib/guides';
import { ArticleBody } from '@/components/article-body';
import { ReviewToc } from '@/components/review-toc';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = readArticleHtml(slug);
  if (!raw) return { title: 'Not found' };
  const title = extractTitleFromArticleHtml(raw);
  const description = extractMetaDescription(raw);
  const url = `${SITE_URL}/guides/${slug}`;
  return {
    title,
    description: description || `${title} — Penny Holiday Budget Maldives travel guide.`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description || undefined,
      url,
      type: 'article',
      locale: 'en_AU',
      siteName: 'Penny Holiday',
      images: [{ url: `${SITE_URL}/api/media/${slug}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || undefined,
      images: [`${SITE_URL}/api/media/${slug}`],
    },
  };
}

function jsonLdArticle(slug: string, title: string, description: string | undefined) {
  const url = `${SITE_URL}/guides/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || title,
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Penny Holiday' },
    publisher: {
      '@type': 'Organization',
      name: 'Penny Holiday',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    image: [`${SITE_URL}/api/media/${slug}`],
    inLanguage: 'en-AU',
  };
}

function jsonLdBreadcrumb(slug: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}/guides/${slug}` },
    ],
  };
}

function formatReviewDate(saved: Record<string, unknown> | null): string | null {
  const raw = saved?.savedAt;
  if (typeof raw !== 'string') return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const raw = readArticleHtml(slug);
  if (!raw) notFound();

  const title = extractTitleFromArticleHtml(raw);
  const description = extractMetaDescription(raw);
  const bodyInner = stripFirstH1(extractBodyInner(raw));
  const withIds = ensureH2Ids(bodyInner);
  const inner = rewriteMediaSources(slug, withIds);
  const toc = extractH2Toc(withIds);
  const saved = readSavedMeta(slug);
  const updatedLabel = formatReviewDate(saved);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle(slug, title, description)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb(slug, title)) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-road-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-road-400">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-400 line-clamp-1">{title}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-road-500/90 mb-3">Budget Maldives travel guide</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.35rem] leading-tight text-balance">
            {title}
          </h1>
          {updatedLabel && typeof saved?.savedAt === 'string' ? (
            <p className="mt-4 text-sm text-slate-500">
              Page updated <time dateTime={saved.savedAt}>{updatedLabel}</time>
            </p>
          ) : null}
        </header>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_min(260px,28%)] xl:gap-16 xl:items-start">
          <div className="min-w-0">
            <ArticleBody html={inner} />
          </div>
          <ReviewToc items={toc} />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-8 mb-4">
        <div className="rounded-2xl bg-ink-800/60 ring-1 ring-white/10 p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-display text-white font-semibold">Looking for the complete Maldives guide?</p>
            <p className="text-sm text-slate-400 mt-1">Browse hundreds of expert resort reviews, itineraries and travel tips on aMaldives.</p>
          </div>
          <a
            href="https://amaldives.com"
            target="_blank"
            rel="noopener"
            className="shrink-0 rounded-full bg-road-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-road-400 transition-colors"
          >
            Visit amaldives.com →
          </a>
        </div>
      </div>
    </>
  );
}

// CTA injected
