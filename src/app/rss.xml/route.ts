import RSS from "rss";
import { siteConfig } from "@/config/site";
import { getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    feed_url: `${siteConfig.url}/rss.xml`,
    site_url: siteConfig.url,
    language: siteConfig.locale,
  });

  for (const article of getAllArticles()) {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${siteConfig.url}/articles/${article.slug}`,
      date: article.date,
      categories: article.tags,
      author: siteConfig.author,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
