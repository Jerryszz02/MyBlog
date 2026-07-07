import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "关于",
  description: "关于作者、关注方向和联系方式。",
};

export default function AboutPage() {
  return (
    <section className="mx-auto grid max-w-3xl gap-8 px-5 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          About
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          关于 {siteConfig.name}
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          这里是个人技术作品集博客，用来记录工程实践、项目复盘、工具使用和长期学习。
          作者展示名、正式联系方式和社交链接仍为待确认项。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            关注方向
          </h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>前端工程、Next.js、TypeScript</li>
            <li>AI 工具链和自动化工作流</li>
            <li>产品原型、项目复盘和可维护性设计</li>
          </ul>
        </section>
        <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            联系方式
          </h2>
          <dl className="mt-4 grid gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <div>
              <dt className="font-medium text-zinc-950 dark:text-white">作者</dt>
              <dd>{siteConfig.author}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-950 dark:text-white">GitHub</dt>
              <dd>{siteConfig.social.github || "待确认"}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-950 dark:text-white">Email</dt>
              <dd>{siteConfig.social.email || "待确认"}</dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  );
}
