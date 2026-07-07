import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type ContentType = "articles" | "projects";

export type ContentItem = {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
  repo?: string;
  demo?: string;
  body: string;
  readingMinutes: number;
};

type RawFrontmatter = {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  tags?: unknown;
  draft?: unknown;
  featured?: unknown;
  repo?: unknown;
  demo?: unknown;
};

const contentRoot = path.join(process.cwd(), "content");

function toDateString(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    return value;
  }

  return new Date().toISOString().slice(0, 10);
}

function toStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function readDirectory(type: ContentType) {
  const directory = path.join(contentRoot, type);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(directory, file));
}

function parseContentFile(type: ContentType, filePath: string): ContentItem {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as RawFrontmatter;
  const slug = path.basename(filePath, ".mdx");
  const stats = readingTime(content);

  return {
    type,
    slug,
    title: typeof frontmatter.title === "string" ? frontmatter.title : slug,
    description:
      typeof frontmatter.description === "string" ? frontmatter.description : "",
    date: toDateString(frontmatter.date),
    tags: toStringList(frontmatter.tags),
    draft: frontmatter.draft === true,
    featured: frontmatter.featured === true,
    repo: typeof frontmatter.repo === "string" ? frontmatter.repo : undefined,
    demo: typeof frontmatter.demo === "string" ? frontmatter.demo : undefined,
    body: content,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
  };
}

function sortByDateDesc(items: ContentItem[]) {
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllContent(type: ContentType, includeDrafts = false) {
  const items = readDirectory(type).map((file) => parseContentFile(type, file));
  const filtered = includeDrafts ? items : items.filter((item) => !item.draft);

  return sortByDateDesc(filtered);
}

export function getAllArticles(includeDrafts = false) {
  return getAllContent("articles", includeDrafts);
}

export function getAllProjects(includeDrafts = false) {
  return getAllContent("projects", includeDrafts);
}

export function getFeaturedArticles(limit = 3) {
  return getAllArticles().filter((item) => item.featured).slice(0, limit);
}

export function getFeaturedProjects(limit = 3) {
  return getAllProjects().filter((item) => item.featured).slice(0, limit);
}

export function getContentBySlug(type: ContentType, slug: string) {
  return getAllContent(type).find((item) => item.slug === slug);
}

export function getAllTags() {
  const tagSet = new Set<string>();

  for (const item of [...getAllArticles(), ...getAllProjects()]) {
    for (const tag of item.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function getContentByTag(tag: string) {
  const decodedTag = decodeURIComponent(tag);
  const items = [...getAllArticles(), ...getAllProjects()].filter((item) =>
    item.tags.includes(decodedTag),
  );

  return sortByDateDesc(items);
}
