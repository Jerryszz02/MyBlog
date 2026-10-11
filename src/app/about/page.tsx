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
        <p className="text-sm font-semibold text-[var(--link)]">
          About
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          关于 {siteConfig.name}
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          我正在构建自己的 Personal Agent，也做应用、游戏和信息工具。
          这里收集我的作品，以及它们背后的选择、问题和开发过程。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            关注方向
          </h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>Personal Agent：对话、记忆与可靠执行</li>
            <li>个人应用、独立游戏与信息工具</li>
            <li>把具体的开发经验整理成手记</li>
          </ul>
        </section>
        <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            联系方式
          </h2>
          <dl className="mt-4 grid gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <div>
              <dt className="font-medium text-zinc-950 dark:text-white">
                作者
              </dt>
              <dd>{siteConfig.author}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-950 dark:text-white">
                GitHub
              </dt>
              <dd>
                <a
                  className="break-all text-[var(--link)] underline underline-offset-4"
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteConfig.social.github}
                </a>
              </dd>
            </div>
            {siteConfig.social.email ? (
              <div>
                <dt className="font-medium text-zinc-950 dark:text-white">
                  Email
                </dt>
                <dd>{siteConfig.social.email}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      </div>
    </section>
  );
}
