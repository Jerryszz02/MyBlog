import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { TagPill } from "@/components/tag-pill";
import { getAllArticles, getContentBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getContentBySlug("articles", slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getContentBySlug("articles", slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto grid max-w-3xl gap-8 px-5 py-12">
      <header className="grid gap-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">/</span>
          <span>{article.readingMinutes} 分钟阅读</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          {article.title}
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </header>
      <MdxContent source={article.body} />
    </article>
  );
}
