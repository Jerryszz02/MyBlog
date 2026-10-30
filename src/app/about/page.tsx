import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "关于",
  description: "软件工程、全栈开发与 AI 应用实践。",
};

export default function AboutPage() {
  return (
    <section className="mx-auto grid max-w-3xl gap-8 px-5 py-16">
      <div className="grid gap-6">
        <h1 className="text-4xl font-semibold tracking-normal text-[var(--ink)]">
          关于 {siteConfig.name}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          我关注软件工程与全栈开发，尤其是把 AI 能力接入实际工作流程。 从
          Personal Agent 的任务恢复与结果验收，到 InfoBoard
          的前端、服务和数据存储，
          我希望做出的工具既能解决具体问题，也能持续维护。
        </p>
        <p className="text-lg leading-8 text-[var(--muted)]">
          我也在开发离线优先的 iPhone 应用 Trainote，并已发布扑克游戏
          PokerGame。 这里收集这些项目的关键实现、工程取舍和当前进展。
        </p>
      </div>
      <div className="flex flex-wrap gap-6 border-t border-[var(--line)] pt-6 text-[var(--link)]">
        <a
          className="underline underline-offset-4"
          href={siteConfig.social.github}
          target="_blank"
          rel="noreferrer"
        >
          在 GitHub 找到我 ↗
        </a>
        {siteConfig.social.email ? (
          <a
            className="underline underline-offset-4"
            href={`mailto:${siteConfig.social.email}`}
          >
            {siteConfig.social.email}
          </a>
        ) : null}
      </div>
    </section>
  );
}
