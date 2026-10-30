import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { compareProjects, getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "作品",
  description: "AI 应用、全栈工具、iOS 应用与游戏的工程实践。",
};

export default function ProjectsPage() {
  const projects = getAllProjects().sort(compareProjects);

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16">
      <div className="grid gap-4">
        <h1 className="text-4xl font-semibold tracking-normal text-[var(--ink)]">
          作品
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
          从 AI 应用到全栈工具，记录解决的问题、关键实现与当前进展。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ContentCard item={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
