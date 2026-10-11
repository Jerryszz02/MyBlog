import Image from "next/image";
import Link from "next/link";
import { AgentSculpture } from "@/components/home/agent-sculpture";
import { HomeMotion } from "@/components/home/home-motion";
import { ProjectArt } from "@/components/home/project-art";
import styles from "@/components/home/home.module.css";
import { writingIdeas } from "@/config/home";
import { siteConfig } from "@/config/site";
import { agentFallbackPaths } from "@/lib/agent-geometry";
import { compareProjects, getAllArticles, getAllProjects } from "@/lib/content";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  const projects = getAllProjects().sort(compareProjects);
  const lead = projects.find((project) => project.slug === "personal-agent");
  const selected = projects
    .filter((project) => project.featured && project !== lead)
    .slice(0, 3);
  const selectedSlugs = new Set([
    lead?.slug,
    ...selected.map((project) => project.slug),
  ]);
  const more = projects.filter((project) => !selectedSlugs.has(project.slug));
  const articles = getAllArticles().slice(0, 3);

  return (
    <HomeMotion>
      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroEyeline}>
            <p className={styles.eyeline}>
              <span aria-hidden="true" />
              正在构建自己的 Personal Agent
            </p>
            <span className={styles.siteNote}>
              PERSONAL WEBSITE / WORK & NOTES
            </span>
          </div>
          <h1
            className={styles.heroTitle}
            id="hero-title"
            aria-label="Building my own Agent"
          >
            <span>BUILDING</span>
            <span className={styles.orange}>MY OWN</span>
            <span>
              AGENT<span className={styles.period}>.</span>
            </span>
          </h1>
          <AgentSculpture
            fallback={
              <svg
                viewBox="0 0 700 700"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              >
                {agentFallbackPaths().map((path, index) => (
                  <path d={path} key={index} />
                ))}
              </svg>
            }
          />
          <div className={styles.heroCopy}>
            <h2>
              把好奇心做成工具，
              <br />
              把过程写成记录。
            </h2>
            <p>
              接下来，我会重点构建自己的 Personal Agent，
              <br className={styles.desktopBreak} />
              也记录应用、游戏和 AI 工具的开发过程。
            </p>
            <div className={styles.actions}>
              <a
                className={styles.solid}
                href={lead ? "#projects" : "/projects"}
              >
                探索 Personal Agent <span aria-hidden="true">↘</span>
              </a>
              <a className={styles.textLink} href="#writing">
                翻翻手记 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <div className={styles.ticker} aria-hidden="true">
          <div>
            {[0, 1].map((copy) => (
              <span key={copy}>
                PERSONAL AGENT <i>✳</i> APPS & GAMES <i>✳</i> BUILD / EXPLORE /
                WRITE <i>✳</i>
              </span>
            ))}
          </div>
        </div>

        {lead ? (
          <section id="projects" className={styles.section}>
            <div className={styles.sectionHead} data-reveal>
              <div>
                <p className={styles.eyeline}>CURRENT FOCUS / 当前主线</p>
                <h2>
                  自己的 Agent，
                  <br className={styles.mobileBreak} />
                  长期的项目。
                </h2>
              </div>
              <p>
                从日常需求出发，逐步构建、验证，
                <br />
                再持续记录。
              </p>
            </div>
            <article className={styles.feature} data-reveal>
              <div className={styles.featureCopy}>
                <p className={styles.status}>{lead.status}</p>
                <h3>
                  PERSONAL
                  <br />
                  AGENT
                </h3>
                <p className={styles.tagline}>让自己的 Agent，逐步走进日常。</p>
                <p className={styles.description}>{lead.description}</p>
                <p className={styles.meta}>
                  当前重点：对话、记忆与可靠执行
                  <br />
                  开发中 · 真实服务仍待验证
                </p>
                <Link
                  href={`/projects/${lead.slug}`}
                  className={styles.textLink}
                >
                  看项目目标与当前进展 <span aria-hidden="true">↗</span>
                </Link>
              </div>
              {lead.cover ? (
                <figure className={styles.featureImage}>
                  <div className={styles.productWindow}>
                    <div className={styles.windowBar}>
                      <span aria-hidden="true">● ● ●</span> personal-agent /
                      demo-space
                    </div>
                    <Image
                      src={lead.cover}
                      alt={lead.coverAlt ?? lead.title}
                      width={1440}
                      height={1000}
                      sizes="(max-width: 700px) 90vw, 52vw"
                    />
                  </div>
                  <figcaption>{lead.coverCaption}</figcaption>
                </figure>
              ) : null}
            </article>
          </section>
        ) : null}

        <section className={styles.section} id="selected-work">
          <div className={styles.sectionHead} data-reveal>
            <div>
              <p className={styles.eyeline}>SELECTED WORK / 主线之外</p>
              <h2>不止一种好奇心。</h2>
            </div>
            <p>
              游戏、个人应用、信息工具。
              <br />
              把具体的问题，做成可以使用的东西。
            </p>
          </div>
          <div className={styles.projectGrid}>
            {selected.map((project) => (
              <article
                className={styles.projectCard}
                key={project.slug}
                data-reveal
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.projectLink}
                  aria-label={`查看 ${project.title} 项目`}
                >
                  <ProjectArt project={project} />
                  <div className={styles.projectMeta}>
                    <span>{project.category}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>
                    {project.title}
                    <span aria-hidden="true">↗</span>
                  </h3>
                  <p>{project.description}</p>
                </Link>
              </article>
            ))}
          </div>
          {more.length ? (
            <details className={styles.moreProjects}>
              <summary>
                更多小工具与业务项目 <span aria-hidden="true">＋</span>
              </summary>
              <div>
                {more.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <strong>{project.title} ↗</strong>
                    <span>{project.description}</span>
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
          <Link href="/projects" className={styles.allProjects}>
            查看全部作品 ↗
          </Link>
        </section>

        <section className={styles.writing} id="writing">
          <div className={styles.writingTop} data-reveal>
            <div>
              <p className={styles.eyeline}>从项目里长出来的文字</p>
              <h2>
                DEV
                <br />
                <span>NOTES_</span>
              </h2>
            </div>
            <div className={styles.writingIntro}>
              <h3>
                做自己的 Agent，
                <br />
                也把过程写下来。
              </h3>
              <p>
                {articles.length
                  ? "记录真实项目中的选择、问题，以及下一次会做得更好的地方。"
                  : "第一篇公开手记还在整理。先从为什么想做自己的 Personal Agent 写起，再聊游戏、应用和开发中的具体问题。"}
              </p>
            </div>
          </div>
          {articles.length ? (
            <div className={styles.stories}>
              {articles.map((article) => (
                <Link
                  className={styles.publishedStory}
                  href={`/articles/${article.slug}`}
                  key={article.slug}
                >
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  <div>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
              <Link className={styles.allProjects} href="/articles">
                全部手记 ↗
              </Link>
            </div>
          ) : (
            <div className={styles.stories}>
              {writingIdeas.map((idea) => (
                <details className={styles.story} key={idea.title}>
                  <summary>
                    <span className={styles.storyTag}>
                      {idea.category}
                      <small>拟写选题 / 尚未发表</small>
                    </span>
                    <div>
                      <h3>{idea.title}</h3>
                      <p>{idea.description}</p>
                    </div>
                    <span className={styles.storyArrow} aria-hidden="true">
                      ↗
                    </span>
                  </summary>
                  <div className={styles.outline}>
                    <p>准备记录的几个问题</p>
                    <ul>
                      {idea.outline.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>

        <section className={styles.next} data-reveal>
          <div>
            <p className={styles.eyeline}>WHAT COMES NEXT / 下一阶段</p>
            <h2>
              围绕这个 Agent，
              <br />
              把几件事做扎实。
            </h2>
            <p>
              从可以演示，走向日常可用。
              <br />
              每一步都留下一点值得记录的经验。
            </p>
          </div>
          <div className={styles.nextItems}>
            <div>
              <h3>让真实的日常任务跑稳</h3>
              <span>下一步</span>
              <p>通过真实模型与任务验证，让执行结果可检查、出错后能继续。</p>
            </div>
            <div>
              <h3>让记忆跟着任务走</h3>
              <span>计划中</span>
              <p>
                把相关背景和偏好带入对话，减少每次重新交代；继续验证它的使用边界。
              </p>
            </div>
          </div>
        </section>
        <section className={styles.about} id="about" data-reveal>
          <div>
            <p className={styles.eyeline}>ABOUT / 这个角落</p>
            <h2>做东西，也写下来。</h2>
          </div>
          <div>
            <p>
              最近，我把重心放在 Personal
              Agent：希望做出一个能长期配合自己工作的个人助手。这里也收集我做过的应用、游戏和工具，以及它们背后的选择和思考。
            </p>
            <div className={styles.actions}>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                className={styles.textLink}
              >
                在 GitHub 找到我 <span aria-hidden="true">↗</span>
              </a>
              <Link href="/about" className={styles.textLink}>
                关于这里 ↗
              </Link>
            </div>
          </div>
        </section>
        <div className={styles.footerWord} aria-hidden="true">
          STAY CURIOUS<span>_</span>
        </div>
      </div>
    </HomeMotion>
  );
}
