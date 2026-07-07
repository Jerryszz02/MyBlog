import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { TagPill } from "@/components/tag-pill";

export function ContentCard({ item }: { item: ContentItem }) {
  const href =
    item.type === "articles"
      ? `/articles/${item.slug}`
      : `/projects/${item.slug}`;

  return (
    <article className="group grid gap-3 rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-700">
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        <span aria-hidden="true">/</span>
        <span>{item.readingMinutes} 分钟阅读</span>
      </div>
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold tracking-normal text-zinc-950 dark:text-white">
          <Link className="inline-flex items-center gap-1.5" href={href}>
            {item.title}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-zinc-400 transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
            />
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
      </div>
      {item.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
