# MyBlog PRD

## 文档目的

本文定义 MyBlog 当前仓库应保持的用户可见行为。它用于指导后续功能变更和验收，避免在没有明确需求时加入后台、数据库、评论、订阅、登录、统计或外部追踪。

## 适用范围

适用于 `/Users/jerryszz/Desktop/Projects/MyBlog` 中现有 Next.js 个人技术作品集博客。本文仅根据当前仓库可见内容整理；未在仓库中找到证据的产品信息均标记为 `待确认`。

| 用户 | 需求 |
| --- | --- |
| 博客作者 | 用本地 MDX 维护文章和项目，用站点配置集中维护个人信息 |
| 访客 | 阅读文章、浏览项目、查看标签聚合、了解作者、订阅 RSS |
| 后续维护者 | 理解页面范围、内容规则、非目标和验收方式 |

## Plan 或项目证据

| 来源 | 内容 |
| --- | --- |
| `package.json` | 项目是 Next.js、React、TypeScript 应用，包含 MDX、RSS、主题和代码高亮相关依赖 |
| `src/app/page.tsx` | 首页展示 Personal Agent 主线、精选项目、开发手记或拟写选题 |
| `src/app/articles`、`src/app/projects`、`src/app/tags/[tag]`、`src/app/about` | 已存在文章、项目、标签和关于页面路由 |
| `src/app/rss.xml/route.ts` | 已存在 RSS 输出能力 |
| `src/lib/content.ts` | 草稿过滤、排序、标签聚合和内容读取集中在内容加载层 |
| `src/config/site.ts` | 站点标题、描述、作者、URL、导航和社交链接集中配置 |

## 产品目标

MyBlog 应作为一个可本地维护、可构建、可继续填充真实内容的个人技术作品集博客。核心价值是把文章、项目和个人介绍组织成清晰、可浏览、可订阅的站点。

## 功能需求

### 2026-10-11 已确认的首页更新

采用 `DESIGN.md` 中的 Signal Poster 方向：作品 + 手记，以 Personal Agent 为主线，随后展示 PokerGame、Trainote、Daily News，更多项目保留轻量入口。Chat Circles 不进入展示。原示例文章与项目保留为草稿。

首页使用真实 MDX 项目详情链接。公开文章为空时展示明确标注的拟写选题，不把选题作为已发表文章，不读取或公开 MDX 草稿。移除首页空标签云，标签路由与项目标签仍保留。

动效支持暂停和系统减少动态效果设置；没有 JavaScript 也能阅读介绍、项目与选题。三维线框是概念交互，不代表 Agent 实时运行。

| 功能 | 当前必须行为 |
| --- | --- |
| 首页 `/` | Signal Poster 首屏、Personal Agent 主推、三件精选作品、更多项目、文章或拟写选题、下一步和关于 |
| 文章列表 `/articles` | 展示非草稿文章，并按日期倒序排列；无公开文章时显示空状态 |
| 文章详情 `/articles/[slug]` | 渲染对应 MDX 正文，展示标题、描述、日期、标签和阅读时长 |
| 项目列表 `/projects` | 展示非草稿项目，精选项目优先 |
| 项目详情 `/projects/[slug]` | 渲染对应 MDX 正文，并展示项目元数据和可选链接 |
| 关于页 `/about` | 展示作者简介、关注方向和 GitHub 入口 |
| 标签页 `/tags/[tag]` | 聚合展示带有该标签的公开文章和项目 |
| RSS `/rss.xml` | 输出非草稿文章，使用站点配置和文章元数据 |
| 深色模式 | 提供主题切换能力，并通过浏览器本地状态保存选择 |
| SEO | 全局 layout 提供基础 metadata，详情页应继续使用内容元数据 |

## 内容规则

| 内容类型 | 位置 | 说明 |
| --- | --- | --- |
| 文章 | `content/articles/*.mdx` | 技术笔记、项目复盘、学习记录 |
| 项目 | `content/projects/*.mdx` | 作品集条目和项目说明 |

`src/lib/content.ts` 当前识别以下 frontmatter 字段：

| 字段 | 类型 | 用途 |
| --- | --- | --- |
| `title` | string | 页面标题、列表标题、RSS 标题 |
| `description` | string | 页面摘要、SEO 描述、列表摘要 |
| `date` | string 或 Date | 排序和展示 |
| `tags` | string[] | 标签页、列表标签和聚合 |
| `draft` | boolean | `true` 时不出现在公开列表、标签、详情查找和 RSS |
| `featured` | boolean | `true` 时可在首页或项目列表优先展示 |
| `featuredOrder` | number，可选 | 精选项目的人工排序，数值越小越靠前；未设置的排后面 |
| `status` / `category` | string，可选 | 项目当前阶段和类别 |
| `cover` / `coverAlt` / `coverCaption` | string，可选 | 本地封面、替代文本及截图性质说明 |
| `repo` | string，可选 | 项目代码链接 |
| `demo` | string，可选 | 项目演示链接 |

## 非功能需求

| 项 | 要求 |
| --- | --- |
| 可维护性 | 内容、配置、页面和组件职责分离 |
| 性能 | 本地静态内容优先，不依赖运行时数据库 |
| 可访问性 | 导航、按钮、链接、主题切换和正文结构保持基本可访问 |
| 响应式 | 移动端和桌面端文本、卡片、导航不重叠、不溢出 |
| 隐私 | 不加入 analytics、telemetry、第三方行为追踪或用户数据采集，除非用户明确要求 |

## 非目标

- 不做评论系统。
- 不做后台 CMS。
- 不接数据库。
- 不做访问统计。
- 不做 Newsletter。
- 不做多语言。
- 不做全文搜索。
- 不把 `node_modules`、`.next`、构建产物或 `.env` 同步到 Git。

## 实现指引

- 页面需要通过 `src/lib/content.ts` 获取内容，避免各页面重复文件系统读取和草稿过滤逻辑。
- 站点身份、域名、导航和社交链接继续集中在 `src/config/site.ts`。
- 新增内容类型、公开状态或排序规则时，应先更新内容加载层和本文档。
- 原示例保留为草稿，不进入公开站点；拟写选题与正式文章分开维护。

## 验收标准

- 主要页面均可访问；没有公开文章时提供明确空状态。
- `draft: true` 内容不出现在文章列表、项目列表、标签页和 RSS。
- 首页优先展示 Personal Agent 与三件精选作品；文章为空时正确展示拟写选题。
- `/rss.xml` 返回有效 RSS XML。
- 主题切换可用，刷新后保持预期主题状态。
- `npm test`、`npm run lint`、`npm run typecheck`、`npm run build` 通过。

## 待确认

| 项 | 需要用户补充 |
| --- | --- |
| 自定义域名（如后续启用） | 当前使用已核验的 Vercel 生产域名；更换时同步 metadata、RSS URL 和生产链接 |
| 首篇正式文章 | 完成后再加入公开文章列表和 RSS |
| 自定义发布与回滚流程 | 当前沿用 Vercel Git 集成，额外流程尚未配置 |
