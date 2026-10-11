import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · 作品与手记
        </p>
        <div className="site-footer-links">
          <Link href="/rss.xml">RSS</Link>
          <Link href="/projects">作品</Link>
          <Link href="/about">关于</Link>
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
