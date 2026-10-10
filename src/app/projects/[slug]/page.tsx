import type { Metadata } from "next";
import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { TagPill } from "@/components/tag-pill";
import { getAllProjects, getContentBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto grid max-w-3xl gap-8 px-5 py-12">
      <header className="grid gap-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <time dateTime={project.date}>{formatDate(project.date)}</time>
          {project.status ? (
            <span className="text-[var(--link)]">{project.status}</span>
          ) : null}
          {project.featured ? (
            <>
              <span aria-hidden="true">/</span>
              <span>精选项目</span>
            </>
          ) : null}
        </div>
        <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          {project.title}
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.repo ? (
            <a
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
              href={project.repo}
              rel="noreferrer"
              target="_blank"
            >
              <Code2 aria-hidden="true" className="size-4" />
              代码
            </a>
          ) : null}
          {project.demo ? (
            <a
              className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              href={project.demo}
              rel="noreferrer"
              target="_blank"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              体验项目
            </a>
          ) : null}
        </div>
      </header>
      {project.cover ? (
        <figure className="grid gap-3">
          <Image
            className="h-auto w-full border border-[var(--line)]"
            loading="eager"
            src={project.cover}
            alt={project.coverAlt ?? project.title}
            width={project.slug === "personal-agent" ? 1440 : 1600}
            height={1000}
            sizes="(max-width: 768px) 94vw, 768px"
          />
          {project.coverCaption ? (
            <figcaption className="text-sm text-[var(--muted)]">
              {project.coverCaption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      <MdxContent source={project.body} />
    </article>
  );
}
