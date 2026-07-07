import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid max-w-5xl gap-4 px-5 py-8 text-sm text-zinc-500 dark:text-zinc-500 md:flex md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/rss.xml">
            RSS
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/about">
            联系
          </Link>
        </div>
      </div>
    </footer>
  );
}
