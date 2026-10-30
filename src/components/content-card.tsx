import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function ContentCard({ item }: { item: ContentItem }) {
  const href =
    item.type === "articles"
      ? `/articles/${item.slug}`
      : `/projects/${item.slug}`;

  return (
    <article className="group grid content-start gap-4 border-t border-[var(--line)] py-7">
      {item.type === "articles" ? (
        <div className="flex flex-wrap items-center gap-4 text-[var(--muted)]">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <span>{item.readingMinutes} 分钟阅读</span>
        </div>
      ) : null}
      <div className="grid gap-3">
        <h2 className="text-2xl font-semibold tracking-normal text-[var(--ink)]">
          <Link className="inline-flex items-center gap-1.5" href={href}>
            {item.title}
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 text-[var(--link)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </h2>
        <p className="leading-8 text-[var(--muted)]">{item.description}</p>
      </div>
      {item.type === "projects" && item.status ? (
        <p className="text-[var(--link)]">{item.status}</p>
      ) : null}
      {item.type === "articles" && item.tags.length > 0 ? (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[var(--muted)]">
          {item.tags.map((tag) => (
            <Link
              className="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--link)]"
              href={`/tags/${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
