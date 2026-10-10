import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-3xl gap-5 px-5 py-24">
      <p className="text-sm font-semibold text-[var(--link)]">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-white">
        没有找到这个页面
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        这个地址可能已经移动，或内容仍是草稿状态。
      </p>
      <Link
        className="inline-flex w-fit rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        href="/"
      >
        回到首页
      </Link>
    </section>
  );
}
