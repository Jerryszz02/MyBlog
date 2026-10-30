---
name: Signal Poster
colors:
  paper: "#E9EFF2" # 我们定的；用户选中第三版样张的背景
  ink: "#10191D" # 我们定的；第三版样张的正文与线框
  primary: "#F4522C" # 我们定的；第三版样张的装置与按钮，CSS 中为 signal
  displayAccent: "#E84420" # 我们定的；浅色主题的大字，确保在两种纸色上至少 3:1
  muted: "#4F6069" # 我们定的；第三版样张的次级文字
  line: "#BAC9D0" # 我们定的；第三版样张的分隔线
  link: "#B62B12" # 我们定的；小字号链接提高对比度
spacing:
  small: 0.5rem # 我们定的；紧密元素
  medium: 1rem # 我们定的；正文块
  section: 5rem # 我们定的；桌面章节
rounded:
  none: 0rem # 我们定的；按钮与外层作品板
typography:
  display:
    fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif'
    fontSize: 9rem # 我们定的；桌面标题上限，按视口缩放
    fontWeight: 900 # 我们定的；保留样张的厚重字形
    lineHeight: 0.9 # 我们定的；拉丁展示标题
    letterSpacing: -0.06em # 我们定的；只用于拉丁展示标题
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: 1rem # 我们定的
    fontWeight: 400 # 我们定的
    lineHeight: 1.8 # 我们定的；中文正文
    letterSpacing: 0em # 我们定的；中文不压缩字距
  utility:
    fontFamily: '"SFMono-Regular", Menlo, Consolas, monospace'
    fontSize: 1rem # 2026-10-29；状态与图片说明使用可读字号，导航保持清晰
    lineHeight: 1.8 # 我们定的
---

# Signal Poster

## Overview

访客在手机或电脑上，通过作品了解 Jerryszz 的软件工程、全栈和 AI 应用实践。2026-10-29 更新以求职展示为重点，精简零碎小字、重复标题和计划性内容，沿用此前选定第三版的冷白、橙黑撞色和倾斜构图。

历史视觉选择原话：「我感觉第三个更好诶 你按照这个实现一下吧」。样张来自本次会话的 `direction-3-hero.png`，没有使用第三方品牌或素材。布局参考研究为 Lusion、Resend、Linear 的公开官网；本项目图形与文案自行制作。

## Colors

上方所有 token 均为本次样张设计所定，不冒充参考网站的测量值。橙色集中于主标题的一行、首屏装置和主要入口。浅色主题的展示大字略微加深；历史首页与手记背景的对比度测量分别为 3.43:1 和 3.11:1，本次页面仍需按实际颜色验收。普通链接使用更深的 link 色，橙色按钮用深色文字。深色主题保留原橙色，将纸色变为深墨、正文变为浅灰；默认浅色，尊重用户已保存的选择。

## Typography

厚重的英文展示字是首屏签名，中文介绍保持平直、可读。英文标题最多三行，中文正文行高 1.8（我们定的）、字距为 0（我们定的）。正文与项目说明使用至少 1rem 的可读字号；减少等宽小标签和装饰性双语标题，不请求外部字体。中文与英文自然混排，不为装饰插入编号。

## Layout

桌面内容宽度上限 90rem、两侧留白约 4.4%（均为我们定的）。左侧三行巨大标题向上倾斜约 5 度，右侧橙色装置向相反方向倾斜约 8 度（我们定的，来自选中样张）。文字与图形局部交叠，按钮和正文不得被遮挡。

首页顺序：首屏与个人介绍 → 精选作品（Personal Agent 主推及 Trainote、InfoBoard、PokerGame）→ 更多探索（DungeonExplorer、Wine Atlas）与全部作品入口 → 联系。移动端重排为单列，保留倾斜标题与装置，正文和所有入口均不依赖悬停。首页移除滚动标语、拟写选题、下一阶段和底部装饰大字。

## Elevation & Depth

用交叠、旋转与局部边框建立前后关系。项目截图允许小幅倾斜，正文和阅读页面保持平直。浮动装置是概念图，不模拟真实任务、模型状态、成功率或运行日志。

## Shapes

矩形与斜切几何为主，按钮不使用药丸造型。手机插图可以使用符合设备外形的圆角。容器之间用细线和留白组织，正文不铺满卡片。

## Components

- Hero：BUILD / USEFUL / THINGS.，中文全栈与 AI 应用介绍，作品和 GitHub 入口。
- Agent sculpture：本地 Canvas 线框，服务端 SVG 保底；保留总动效开关，减少动态效果设置下静止，离开视口或后台停绘。移除概念模式按钮及微文案。
- Featured project：Personal Agent，来源明确的示例截图、开发状态、项目详情入口。
- Selected projects：Trainote、InfoBoard、PokerGame；真实截图与说明性图形分别标明性质，以标题、摘要和当前阶段组织信息。
- More explorations：直接可见的 DungeonExplorer、Wine Atlas 入口和全部作品链接。
- Reading pages：作品列表、详情和关于页延续纸灰与橙黑风格，减少重复元信息和装饰性小标题；项目技术标签保留普通链接。
- Navigation：作品、关于、GitHub 和主题切换；页脚保留手记与 RSS，标签路由继续可访问。

## Do's and Don'ts

以下为历史视觉选择；本次用户要求「在现在这个美术风格上，让它尽量变得简洁一点」，并明确求职方向为「软件工程 / 全栈，突出 AI 应用经验」。信息架构与文字密度以 2026-10-29 更新为准。

历史用户原话：

- 「我感觉第三个更好诶 你按照这个实现一下吧」——选中 Signal Poster。
- 「我觉得 Chat Circle 就不要放了吧。」——不将该项目放入网站。
- 「帮我把那个 Personal Agent 我觉得可以重点放一下，因为这个可能是我接下来一段时间重点开发的一个方向。」——Personal Agent 为主推。
- 「从 UI 设计上我觉得有点太朴素了。」——否决原来的朴素设计。
- 「比较多动效的、大胆一点的一些网页设计，比较充满张力」——保留强构图与有目的的动效。

## 什么时候别用这套

长篇文章、代码块和技术细节页面不使用倾斜正文、大幅装置或持续运动；保留品牌色与字体关系，优先阅读。

## 实现时的创意指令

在尊重本文件已确认的设计方向、真实内容和用户原话约束的前提下，充分发挥你的设计创造力。

开始实现前，用工具生成一串随机字母与数字，从其中的组合、节奏和联想中寻找灵感，用于尚未确定的构图、排版、色彩、图像和交互设计。随机字符串仅供创作启发，不要出现在页面中。

大胆做出具体、有个性的设计选择，尝试你通常不会首先采用的表达。需要时使用图片生成来实现关键视觉。运用你的判断，让这些选择形成一个完整、有吸引力、适合这个产品的设计。
