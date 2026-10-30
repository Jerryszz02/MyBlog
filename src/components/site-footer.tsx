import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="site-footer-links">
          <Link href="/rss.xml">RSS</Link>
          <Link href="/articles">手记</Link>
          <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
