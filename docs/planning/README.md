# MyBlog 规划文档索引

## 文档说明

本目录记录 MyBlog 当前仓库可见状态下的产品、技术和验收依据。本文档按现有项目梳理模式生成，仅根据当前仓库可见内容整理；未在仓库中找到证据的内容均不做假设，并统一标记为 `待确认`。

## 生成信息

| 项目 | 内容 |
| --- | --- |
| 更新时间 | 2026-10-11 |
| 项目根目录 | `/Users/jerryszz/Desktop/Projects/MyBlog` |
| 工作模式 | 现有项目梳理模式：根据已实现的 Next.js 项目更新规划文档 |
| 当前项目状态 | 已实现本地 MDX 驱动的个人作品集博客；采用已确认的 Signal Poster 首页，Git 仓库已建立 |

## 已检查的关键项目证据

| 证据 | 结论 |
| --- | --- |
| `package.json` | 使用 Next.js、React、TypeScript、Tailwind、MDX、RSS 和主题相关依赖；包含 `dev`、`build`、`lint`、`typecheck`、`test` 脚本 |
| `.gitignore` | 已忽略 `node_modules`、`.next`、构建产物、环境变量、日志和系统文件 |
| `src/config/site.ts` | 展示名为 Jerryszz，GitHub 入口已配置；站点 URL 使用已核验的生产域名 `https://myblog-lac-tau-25.vercel.app` |
| `src/lib/content.ts` | 统一读取 MDX、过滤草稿、聚合标签；文章按日期排序，精选项目支持 `featuredOrder` |
| `src/app/page.tsx` | 首页突出 Personal Agent，展示精选作品、开发手记或拟写选题、下一步和关于 |
| `src/app/layout.tsx` | 全局 metadata、RSS alternate、主题 Provider、页头和页脚集中在根布局 |
| `src/app/rss.xml/route.ts` | 基于公开文章生成 RSS XML，使用 `siteConfig.url` 和 `siteConfig.author` |
| `src/app/articles/*`、`src/app/projects/*`、`src/app/tags/[tag]/page.tsx`、`src/app/about/page.tsx` | 已存在文章、项目、标签和关于页面路由 |
| `content/articles/*.mdx`、`content/projects/*.mdx` | 八个真实项目条目；原示例内容保留为草稿，尚无公开文章 |
| `DESIGN.md`、`src/components/home/*` | 已选视觉、响应式布局、可暂停 Canvas 装置和服务端静态保底 |
| GitHub PR #2 的 Vercel 检查（2026-10-11 核验） | 已存在 Vercel Git 预览集成，构建成功；预览保留 Vercel 登录保护，认证读取首页返回 200 |

## 项目是什么

MyBlog 是一个个人技术作品集博客。它用本地 MDX 文件保存文章和项目内容，用 Next.js App Router 渲染首页、列表页、详情页、标签页、关于页和 RSS。项目当前不包含后台 CMS、数据库、评论、订阅、登录或统计追踪。

## 组成部分

| 部分 | 用途 |
| --- | --- |
| Next.js App Router 应用 | 提供页面路由、metadata、静态 RSS 路由和整体布局 |
| `content/articles/*.mdx` | 保存文章内容和 frontmatter 元数据 |
| `content/projects/*.mdx` | 保存项目内容和 frontmatter 元数据 |
| `src/lib/content.ts` | 作为文章、项目、标签和 RSS 的唯一内容加载来源 |
| `src/config/site.ts` | 集中维护站点级配置和仍待确认的信息 |
| `src/components/*` | 提供页头、页脚、主题切换、内容卡片、标签和 MDX 展示组件 |

## 已生成或更新文档

| 文档 | 用途 |
| --- | --- |
| `docs/planning/README.md` | 规划文档入口，记录项目证据、文档集合、跳过项和待确认项 |
| `docs/planning/prd.md` | 定义当前已实现和应保持的用户可见行为 |
| `docs/planning/technical-design.md` | 说明当前实现结构、数据流、边界和维护约束 |
| `docs/planning/test-plan.md` | 定义自动检查和人工验收方式 |
| `DESIGN.md` | 第三版 Signal Poster 的已确认设计规范与内容约束 |

## 已跳过目录文档

| 文档 | 跳过原因 |
| --- | --- |
| `project-brief.md` | 项目背景、目标、范围和非目标已在本索引与 PRD 中覆盖，单独成篇会重复 |
| `architecture.md` | 当前是单个 Next.js 应用，模块边界和数据流已合并到技术设计 |
| `user-flow.md` | 访问入口、主流程、空状态和验收场景已合并到 PRD 与测试计划 |
| `api-design.md` | 仓库没有内容管理 API 或稳定客户端服务契约；`/rss.xml` 作为 RSS 页面能力记录在技术设计中 |
| `database-design.md` | 当前不使用数据库、迁移、索引或持久化 schema |
| `security-privacy.md` | 当前没有登录、凭据、支付、用户私密数据或第三方追踪；隐私约束合并到 PRD 与技术设计 |
| `release-plan.md` | 当前沿用 Vercel Git 集成；合并后核对生产提交、域名和页面，尚未定义自定义发布或回滚流程 |
| `operations-runbook.md` | 未发现长期运行任务、队列、外部集成或生产运维流程证据 |
| `decision-log.md` | 关键取舍较少，已合并到技术设计 |

## 后续开发入口

1. 站点域名变化时同步更新 `src/config/site.ts`，复查 HTML 中的 RSS 入口与 RSS 自身链接。
2. 在 `content/articles` 和 `content/projects` 维护真实 MDX 内容。
3. 修改产品行为前先更新 `docs/planning/prd.md`。
4. 修改内容加载、路由、RSS、主题或 SEO 前先更新 `docs/planning/technical-design.md`。
5. 交付前按 `docs/planning/test-plan.md` 运行自动检查和人工验收。

## 待确认

| 项 | 影响 |
| --- | --- |
| 自定义域名（如后续启用） | 当前使用 Vercel 生产域名；更换后需同步 metadata 和 RSS |
| 首篇正式文章 | 拟写选题有明确标识；完成后作为非草稿 MDX 进入文章列表和 RSS |
| 自定义发布与回滚流程 | 当前沿用 Vercel Git 集成；额外发布流程尚未配置 |

## 人工检查建议

| 建议 | 原因 |
| --- | --- |
| 发布后检查 `src/config/site.ts` 对应域名的 RSS 链接 | 首页订阅入口、RSS 自身地址与条目地址应指向同一站点 |
| 新增文章时明确 `draft` 状态 | 拟写选题与原示例不是已发表文章 |
| 正式发布时核对生产项目、域名与提交 | Vercel 预览就绪不代表生产发布已完成 |
