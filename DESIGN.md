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
    fontSize: 0.75rem # 我们定的；状态、导航、图片说明
    lineHeight: 1.8 # 我们定的
---

# Signal Poster

## Overview

访客在手机或电脑上，通过作品与手记认识 Jerryszz；首先看到持续投入的 Personal Agent，再浏览游戏、应用和工具。用户已在三版样张中选定第三版，正式实现沿用其冷白、橙黑撞色和倾斜构图。

确认原话：「我感觉第三个更好诶 你按照这个实现一下吧」。样张来自本次会话的 `direction-3-hero.png`，没有使用第三方品牌或素材。布局参考研究为 Lusion、Resend、Linear 的公开官网；本项目图形与文案自行制作。

## Colors

上方所有 token 均为本次样张设计所定，不冒充参考网站的测量值。橙色集中于主标题的一行、首屏装置和主要入口。浅色主题的展示大字略微加深，在首页与手记背景上的对比度分别为 3.43:1 和 3.11:1；普通小字链接使用更深的 link 色，橙色按钮用深色文字。深色主题保留原橙色，将纸色变为深墨、正文变为浅灰；默认浅色，尊重用户已保存的选择。

## Typography

厚重的英文展示字是首屏签名，中文介绍保持平直、可读。英文标题最多三行，中文正文行高 1.8（我们定的）、字距为 0（我们定的）。导航和说明使用系统等宽字体，不请求外部字体。中文与英文自然混排，不为装饰插入编号。

## Layout

桌面内容宽度上限 90rem、两侧留白约 4.4%（均为我们定的）。左侧三行巨大标题向上倾斜约 5 度，右侧橙色装置向相反方向倾斜约 8 度（我们定的，来自选中样张）。文字与图形局部交叠，按钮和正文不得被遮挡。

首页顺序：首屏 → Personal Agent 主推 → 三张错落作品板 → 更多项目 → 开发手记 → 下一步 → 关于。移动端重排为单列，保留倾斜标题与装置，正文和所有入口均不依赖悬停。

## Elevation & Depth

用交叠、旋转与局部边框建立前后关系。项目截图允许小幅倾斜，正文和阅读页面保持平直。浮动装置是概念图，不模拟真实任务、模型状态、成功率或运行日志。

## Shapes

矩形与斜切几何为主，按钮不使用药丸造型。手机插图可以使用符合设备外形的圆角。容器之间用细线和留白组织，正文不铺满卡片。

## Components

- Hero：BUILDING / MY OWN / AGENT，中文介绍和两条真实站内入口。
- Agent sculpture：本地 Canvas 线框，服务端 SVG 保底；对话、记忆、执行三个概念按钮。提供总动效开关，减少动态效果设置下静止，离开视口或后台停绘。
- Featured project：Personal Agent，来源明确的示例截图、开发状态、项目详情入口。
- Selected projects：PokerGame、Trainote、Daily News。第一项用真实游戏截图，其他为注明性质的说明性图形。
- Notes：有正式文章时读取 MDX；无文章时展示明确标记的拟写选题，以原生 details 查看提纲，不公开 MDX 草稿。
- Navigation：作品、手记、关于、GitHub 和主题切换。保留 RSS 与标签访问路径。

## Do's and Don'ts

用户原话：

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
