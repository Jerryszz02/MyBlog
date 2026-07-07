import type { Metadata } from "next";
import { ContentCard } from "@/components/content-card";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "项目",
  description: "个人项目、作品集和技术实践展示。",
};

export default function ProjectsPage() {
  const projects = [...getAllProjects()].sort((a, b) => {
    if (a.featured === b.featured) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return a.featured ? -1 : 1;
  });

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Projects
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          项目
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          这里展示个人作品、技术栈、实现背景和可继续展开的项目复盘。
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
