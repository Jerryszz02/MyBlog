export function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function absoluteUrl(pathname: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return new URL(pathname, base).toString();
}
