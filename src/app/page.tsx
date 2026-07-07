import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentCard } from "@/components/content-card";
import { TagPill } from "@/components/tag-pill";
import { siteConfig } from "@/config/site";
import {
  getAllArticles,
  getAllTags,
  getFeaturedProjects,
} from "@/lib/content";

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);
  const featuredProjects = getFeaturedProjects(3);
  const tags = getAllTags().slice(0, 12);

  return (
    <div className="mx-auto grid max-w-5xl gap-14 px-5 py-12 md:py-16">
      <section className="grid gap-8 md:grid-cols-[1.4fr_0.8fr] md:items-end">
        <div className="grid gap-5">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            个人技术作品集
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-white md:text-6xl">
            记录技术实践、项目复盘和长期学习。
          </h1>
          <p className="max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
            {siteConfig.name} 用来沉淀文章、展示项目，并把可复用的工程经验整理成可检索的个人知识库。
            作者信息、正式域名和社交链接仍为待确认项。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              href="/articles"
            >
              阅读文章
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
              href="/projects"
            >
              查看项目
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-semibold text-zinc-950 dark:text-white">
            当前关注
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>Next.js、TypeScript 和前端工程实践</li>
            <li>AI 工具链、自动化工作流和产品原型</li>
            <li>项目复盘、问题诊断和可维护性设计</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 dark:text-white">
              最新文章
            </h2>
          </div>
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            href="/articles"
          >
            全部文章
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestArticles.map((article) => (
            <ContentCard item={article} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Projects
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 dark:text-white">
              精选项目
            </h2>
          </div>
          <Link
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            href="/projects"
          >
            全部项目
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ContentCard item={project} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          常用标签
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </section>
    </div>
  );
}
