import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { getAllProjects, getContentBySlug } from "@/lib/content";

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
    <article className="mx-auto grid max-w-3xl gap-10 px-5 py-16">
      <header className="grid gap-5">
        <h1 className="text-4xl font-semibold tracking-normal text-[var(--ink)]">
          {project.title}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          {project.description}
        </p>
        {project.status ? (
          <p className="text-[var(--link)]">{project.status}</p>
        ) : null}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[var(--muted)]">
          {project.tags.map((tag) => (
            <Link
              className="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--link)]"
              href={`/tags/${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
        {project.repo || project.demo ? (
          <div className="flex flex-wrap gap-3">
            {project.repo ? (
              <a
                className="inline-flex items-center gap-2 border border-[var(--line)] px-4 py-3 font-medium text-[var(--ink)] transition hover:border-[var(--link)]"
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
                className="inline-flex items-center gap-2 bg-[var(--ink)] px-4 py-3 font-medium text-[var(--paper)] transition hover:opacity-80"
                href={project.demo}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                体验项目
              </a>
            ) : null}
          </div>
        ) : null}
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
            <figcaption className="text-[var(--muted)]">
              {project.coverCaption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      <MdxContent source={project.body} />
    </article>
  );
}
