import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/content-card";
import { getAllTags, getContentByTag } from "@/lib/content";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `标签：${decodedTag}`,
    description: `浏览 ${decodedTag} 标签下的文章和项目。`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const items = getContentByTag(decodedTag);

  if (items.length === 0) {
    notFound();
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Tag
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
          {decodedTag}
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          这个标签下共有 {items.length} 条公开内容。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <ContentCard item={item} key={`${item.type}-${item.slug}`} />
        ))}
      </div>
    </section>
  );
}
