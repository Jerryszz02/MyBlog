import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "文章",
  description: "技术笔记、项目复盘和长期学习记录。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold text-[var(--link)]">
          Articles
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          文章
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          记录项目中的选择、问题与开发过程。
        </p>
      </div>
      <div className="grid gap-4">
        {articles.length === 0 ? (
          <div className="border-y border-[var(--line)] py-10">
            <h2 className="text-2xl font-semibold text-[var(--ink)]">
              作品先见面，故事慢慢写。
            </h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              第一篇公开手记还在整理。我会先从为什么想做一个自己的 Personal
              Agent 写起。
            </p>
            <Link
              className="mt-6 inline-block text-[var(--link)] underline underline-offset-4"
              href="/#writing"
            >
              看看准备写的故事 ↗
            </Link>
          </div>
        ) : null}
        {articles.map((article) => (
          <ContentCard item={article} key={article.slug} />
        ))}
      </div>
    </section>
  );
}
