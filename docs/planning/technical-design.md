# MyBlog 技术设计

## 文档目的

本文说明 MyBlog 当前实现结构、数据流、维护边界和技术约束。后续修改内容加载、路由、主题、RSS、SEO 或样式前，应先对照本文确认影响范围。

## 适用范围

适用于 `/Users/jerryszz/Desktop/Projects/MyBlog` 中现有 Next.js App Router 项目。本文仅根据当前仓库可见内容整理；未在仓库中找到证据的部署、生产监控、域名和外部服务均标记为 `待确认`。

## Plan 或项目证据

| 来源 | 内容 |
| --- | --- |
| `package.json` | 使用 Next.js、React、TypeScript、Tailwind、`next-mdx-remote`、`gray-matter`、`reading-time`、`rss`、`next-themes`、`rehype-highlight` |
| `src/config/site.ts` | 站点级配置集中维护 |
| `src/lib/content.ts` | 内容加载层集中处理 MDX 文件读取、frontmatter、草稿过滤、排序、标签聚合 |
| `src/app/layout.tsx` | 全局 metadata、RSS alternate、页头、页脚和主题 Provider 位于根布局 |
| `src/app/rss.xml/route.ts` | RSS 由公开文章生成，路由声明为静态 |
| `.gitignore` | 本地依赖、构建产物、环境变量、日志和系统文件不会进入 Git |

## 选定方案

| 主题 | 当前决策 |
| --- | --- |
| 框架 | Next.js App Router |
| 语言 | TypeScript |
| 样式 | 首页 CSS Module、共享全局变量与 Tailwind 阅读页面 |
| 内容 | 本地 MDX 文件加 frontmatter |
| 内容解析 | `gray-matter` 解析 frontmatter，`reading-time` 计算阅读时间 |
| MDX 渲染 | 通过共享 MDX 展示组件渲染正文 |
| 主题 | `next-themes` 管理主题状态 |
| RSS | `rss` 包从公开文章生成 `/rss.xml` |
| 字体 | 当前未发现外部字体配置 |

## 数据和状态流

### Signal Poster 首页

`src/app/page.tsx` 仍为服务端组件，项目和已发表文章统一取自内容加载器。首页拟写选题是显式维护的公开选题清单，不读取草稿正文。`featuredOrder` 控制人工精选顺序。

首页 CSS Module 与共享页头、页脚负责视觉。客户端仅承载动效设置和 Canvas；每帧使用局部变量与预计算几何数据，不触发 React 更新。SSR 提供静态线框与完整正文，减少动态效果、暂停、离屏及隐藏页面均可停止动画，卸载清理监听器和 RAF。

本地截图使用 Next.js Image 提供尺寸与响应式加载，不引入动画库、字体服务、CMS 或追踪。

1. 作者在 `content/articles` 或 `content/projects` 添加或修改 `.mdx` 文件。
2. `src/lib/content.ts` 读取对应目录，把文件名转换为 slug。
3. 内容加载层解析 frontmatter，补齐默认值，计算阅读时间。
4. 默认公开查询会过滤 `draft: true` 内容。
5. 列表、详情、标签、首页和 RSS 都复用同一个内容加载层。
6. `src/config/site.ts` 为 layout、RSS、导航和页面展示提供站点级配置。
7. 主题状态由浏览器端主题 Provider 管理，不写入服务端存储。

## 受影响子系统

| 子系统 | 当前职责 | 维护注意 |
| --- | --- | --- |
| 站点配置 | 提供站点名、标题、描述、作者、URL、语言、导航和社交链接 | 上线前必须替换占位 URL；当前展示名 Jerryszz，GitHub 已配置 |
| 内容加载 | 读取 MDX、解析 frontmatter、过滤草稿、排序、聚合标签 | 新增字段或内容类型应先扩展类型和统一读取逻辑 |
| 页面路由 | 提供首页、文章、项目、标签、关于和 RSS | 页面不应绕过内容加载层直接读取文件 |
| 共享组件 | 提供页头、页脚、主题切换、内容卡片、标签、MDX 容器 | 保持组件只处理展示，不嵌入业务数据来源 |
| 样式 | 提供全局排版、色彩、响应式和 MDX 正文样式 | 修改样式后需要复查移动端和深色模式 |
| Git 同步 | `.gitignore` 排除依赖、构建产物、环境变量和日志 | 不应提交 secrets 或本地生成目录 |

## 错误和边界处理

| 场景 | 当前行为或要求 |
| --- | --- |
| 内容目录不存在 | 内容加载层返回空数组 |
| slug 不存在 | 详情页应使用 Next.js 404 行为 |
| 内容是草稿 | 不进入公开列表、标签、RSS 和公开详情查询 |
| frontmatter 字段缺失 | 标题回退到 slug，描述回退为空，日期回退到当前日期，标签回退为空数组 |
| 站点 URL 未确认 | 当前为 `https://example.com`，上线前必须替换 |

## 关键决策

| 决策 | 理由 | 后果 |
| --- | --- | --- |
| 使用本地 MDX 而非 CMS | 适合个人维护，减少后台和外部服务依赖 | 内容发布需要代码提交或文件同步 |
| 内容加载层统一过滤草稿 | 保证列表、详情、标签和 RSS 行为一致 | 新页面必须复用加载层 |
| 不加入统计和追踪 | 符合当前隐私和简单性要求 | 无法从项目内获得访问数据 |
| 创建 GitHub 仓库前保持 `.gitignore` 生效 | 避免同步依赖、构建产物和环境变量 | 首次同步只包含源代码、内容、配置和规划文档 |

## 非目标

- 不新增内容管理 API。
- 不新增数据库、迁移或缓存服务。
- 不新增第三方统计、广告或追踪脚本。
- 不定义部署流水线，除非用户确认部署平台。
- 不把本地依赖、构建目录、环境变量或日志提交到 Git。

## 实现指引

- 新增页面时优先复用已有组件和 `src/lib/content.ts`。
- 新增 frontmatter 字段时同步更新 `ContentItem`、`RawFrontmatter`、PRD 和测试计划。
- 修改 RSS 时检查 `siteConfig.url`、文章 slug、日期、分类和作者字段。
- 修改 metadata 时检查 `src/app/layout.tsx` 和详情页 metadata 是否一致。
- 修改主题或样式时同时检查 light、dark、system 和移动端布局。

## 验收标准

- 内容加载器仍是文章、项目、标签和 RSS 的唯一数据来源。
- 公开页面不会展示 `draft: true` 内容。
- RSS 输出使用公开文章和站点配置。
- `.gitignore` 能阻止依赖、构建产物和 secrets 被提交。
- `npm test`、`npm run lint`、`npm run typecheck`、`npm run build` 通过。

## 待确认

| 项 | 影响 |
| --- | --- |
| 正式域名 | 上线前需要替换 `siteConfig.url` |
| 部署平台 | 影响构建命令、静态/服务端能力、环境配置和发布验收 |
| 是否需要 sitemap | 当前仓库未发现 sitemap 路由或生成配置 |
