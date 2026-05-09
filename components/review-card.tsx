import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  description?: string;
};

export function ReviewCard({ slug, title, description }: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-sage-900/60 ring-1 ring-terra-500/25 transition-all hover:ring-terra-400/40 hover:shadow-warm"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-sage-800 to-sage-950">
        <div className="absolute inset-0 bg-gradient-to-bl from-terra-500/12 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-display font-medium text-terra-500/10 select-none">
            ✦
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sage-950 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5 bg-sage-900/20">
        <h2 className="font-display text-lg font-semibold text-cream group-hover:text-terra-300 transition-colors line-clamp-2">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm text-sage-300/70 line-clamp-2">{description}</p>
        ) : null}
        <span className="mt-auto pt-4 text-xs font-medium uppercase tracking-wider text-terra-400">Read Story →</span>
      </div>
    </Link>
  );
}
