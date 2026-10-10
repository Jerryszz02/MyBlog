# MyBlog 测试计划

## 文档目的

本文定义 MyBlog 当前版本的自动检查和人工验收方式，确保实现符合 PRD 与技术设计。

## 适用范围

适用于 `/Users/jerryszz/Desktop/Projects/MyBlog` 中使用 Next.js、TypeScript、Tailwind CSS、本地 MDX 和 RSS 的个人技术作品集博客。本文仅根据当前仓库可见内容整理；未发现部署平台配置，因此生产发布检查为 `待确认`。

## Plan 或项目证据

| 来源 | 内容 |
| --- | --- |
| `package.json` | 可运行 `npm test`、`npm run lint`、`npm run typecheck`、`npm run build` |
| `src/lib/content.ts` | 需要验证草稿过滤、排序、标签聚合和 MDX 读取 |
| `src/app/*` | 需要验证首页、文章、项目、标签、关于和 RSS 路由 |
| `src/components/theme-toggle.tsx`、`src/components/theme-provider.tsx` | 需要人工验证主题切换 |

## 自动检查

| 命令 | 验证内容 |
| --- | --- |
| `npm test` | Node 22+ 原生测试：临时 MDX 夹具验证精选顺序、字段解析和草稿边界；几何闭合与 SVG 保底 |
| `npm run lint` | ESLint 和 Next.js 基础规则 |
| `npm run typecheck` | TypeScript 类型正确性 |
| `npm run build` | Next.js 生产构建、静态路径、RSS 路由和 MDX 渲染 |

## 人工验收场景

| 场景 | 预期结果 |
| --- | --- |
| 访问 `/` | 与 `DESIGN.md` 第三版方向一致；Personal Agent 主推，其后为 PokerGame、Trainote、Daily News |
| 访问 `/articles` | 只展示非草稿文章，按日期倒序；无公开文章时有明确空状态和选题入口 |
| 访问 `/articles/[slug]` | 展示文章详情、标签、阅读时长和 MDX 正文 |
| 访问 `/projects` | 展示八个公开项目；精选项目按 `featuredOrder` 优先，不展示原示例草稿 |
| 访问 `/projects/[slug]` | 展示项目详情、可选项目链接和 MDX 正文 |
| 访问 `/about` | 展示当前关注方向和 GitHub 入口，无虚构身份或邮箱 |
| 访问 `/tags/[tag]` | 展示该标签下的文章和项目 |
| 访问 `/rss.xml` | 返回包含非草稿文章的 RSS XML |
| 切换主题 | light、dark、system 可切换，刷新后保持预期状态 |
| 移动端浏览 | 文本、卡片、导航和按钮不重叠、不溢出 |
| 更多项目与拟写选题 | 原生 details 可展开；选题标为尚未发表，提纲不是草稿正文 |
| 装置交互 | 对话、记忆、执行切换状态和说明；线框随模式变化 |
| 动效开关与系统设置 | 暂停时线框和装饰动画停止；减少动态效果时静止、开关禁用；装置离屏或页面隐藏时停止连续绘制 |
| 禁用 JavaScript | 正文、项目入口、选题提纲及静态 SVG 仍存在 |
| 图片与对比度 | 截图有性质说明、无拉伸；大字对比度至少 3:1，普通文字至少 4.5:1；使用响应式图片 |

## 回归场景

| 场景 | 检查方式 |
| --- | --- |
| 新增 `draft: true` 文章或项目 | 不应出现在列表、标签、详情静态路径和 RSS |
| 新增带新标签内容 | 标签入口和标签页应包含新标签 |
| 删除某篇内容 | 构建不应继续生成对应公开详情路径 |
| 修改 `src/config/site.ts` | 首页、metadata、RSS 和页脚应使用新配置 |
| 修改 MDX 渲染组件 | 文章和项目详情正文仍可正常显示代码块、链接和标题 |

## 非目标

- 当前不要求 E2E 自动化测试。
- 当前不要求性能压测。
- 当前不要求视觉回归测试。
- 当前不定义生产部署检查，因为仓库未提供部署平台证据。

## 验收标准

- `npm run lint` 通过。
- `npm test` 通过。
- `npm run typecheck` 通过。
- `npm run build` 通过。
- 人工验收场景全部满足，或在交付说明中列出未完成项。
- 浏览器至少覆盖 320、375、390、768、1024、1280、1440px 宽度，以及深色主题、减少动态效果、无 JavaScript 和草稿详情 404。
- Git 同步前 `git status --short` 不包含 `node_modules`、`.next`、`.env` 或日志文件。

## 待确认

| 项 | 影响 |
| --- | --- |
| 部署平台 | 目前只验证本地构建；上线前需要补充部署平台检查 |
| 真实内容量 | 内容增加后需要复查列表、标签页、RSS 和移动端可读性 |
| 是否需要自动化 E2E | 当前仓库未提供 Playwright、Cypress 或其他 E2E 配置 |
