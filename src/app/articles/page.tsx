import type { Metadata } from "next";
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
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Articles
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          文章
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          这里收集技术笔记、项目复盘和工具实践。草稿内容不会出现在公开列表。
        </p>
      </div>
      <div className="grid gap-4">
        {articles.map((article) => (
          <ContentCard item={article} key={article.slug} />
        ))}
      </div>
    </section>
  );
}
