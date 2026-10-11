import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        跳到正文
      </a>
      <div className="site-header-inner">
        <Link
          className="site-brand"
          href="/"
          aria-label={`${siteConfig.name} 首页`}
        >
          <span className="site-brand-mark" aria-hidden="true">
            &gt;_
          </span>
          {siteConfig.name.toUpperCase()}
        </Link>
        <nav aria-label="主导航" className="site-nav">
          {siteConfig.nav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header-actions">
          <a
            className="site-github"
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB ↗
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
