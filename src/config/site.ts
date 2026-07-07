export const siteConfig = {
  name: "MyBlog",
  title: "MyBlog | 个人技术作品集",
  description: "记录技术实践、项目复盘和长期学习的个人博客。",
  author: "待确认",
  url: "https://example.com",
  locale: "zh-CN",
  nav: [
    { href: "/articles", label: "文章" },
    { href: "/projects", label: "项目" },
    { href: "/about", label: "关于" },
  ],
  social: {
    github: "",
    email: "",
  },
};

export type SiteConfig = typeof siteConfig;
