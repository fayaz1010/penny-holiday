import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  description?: string;
};

export function ReviewCard({ slug, title, description }: Props) {
  return (
    <Link
      href={`/guides/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-ink-800/60 ring-1 ring-white/10 transition-all hover:ring-road-500/40 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-700 opacity-30 group-hover:opacity-45 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-display font-bold text-white/10 select-none">
            P
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-lg font-semibold text-white group-hover:text-road-300 transition-colors line-clamp-2">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm text-slate-400 line-clamp-2">{description}</p>
        ) : null}
        <span className="mt-auto pt-4 text-xs font-medium uppercase tracking-wider text-road-400">Read guide →</span>
      </div>
    </Link>
  );
}
