import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "手记",
  description: "技术笔记、项目复盘和长期学习记录。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-16">
      <div className="grid gap-4">
        <h1 className="text-4xl font-semibold tracking-normal text-[var(--ink)]">
          手记
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
          记录项目中的选择、问题与开发过程。
        </p>
      </div>
      <div className="grid gap-4">
        {articles.length === 0 ? (
          <div className="border-y border-[var(--line)] py-10">
            <p className="leading-8 text-[var(--muted)]">
              暂无公开手记。项目的实现与工程取舍可以先在作品中查看。
            </p>
            <Link
              className="mt-6 inline-block text-[var(--link)] underline underline-offset-4"
              href="/projects"
            >
              查看作品 ↗
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
