export const siteConfig = {
  name: "Jerryszz",
  title: "Jerryszz | 作品与手记",
  description: "正在构建自己的 Personal Agent，也记录应用、游戏和 AI 工具的开发过程。",
  author: "Jerryszz",
  url: "https://example.com",
  locale: "zh-CN",
  nav: [
    { href: "/projects", label: "作品" },
    { href: "/articles", label: "手记" },
    { href: "/about", label: "关于" },
  ],
  social: {
    github: "https://github.com/Jerryszz02",
    email: "",
  },
};

export type SiteConfig = typeof siteConfig;
