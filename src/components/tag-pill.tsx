import Link from "next/link";

export function TagPill({ tag }: { tag: string }) {
  return (
    <Link
      className="inline-flex items-center rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:border-orange-300 hover:text-orange-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-orange-700 dark:hover:text-orange-300"
      href={`/tags/${encodeURIComponent(tag)}`}
    >
      {tag}
    </Link>
  );
}
