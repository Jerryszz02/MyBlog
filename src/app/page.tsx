import Image from "next/image";
import Link from "next/link";
import { AgentSculpture } from "@/components/home/agent-sculpture";
import { HomeMotion } from "@/components/home/home-motion";
import { ProjectArt } from "@/components/home/project-art";
import styles from "@/components/home/home.module.css";
import { siteConfig } from "@/config/site";
import { agentFallbackPaths } from "@/lib/agent-geometry";
import { getPortfolioProjects } from "@/lib/content";

export default function HomePage() {
  const { lead, selected, explorations } = getPortfolioProjects();

  return (
    <HomeMotion>
      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1
            className={styles.heroTitle}
            id="hero-title"
            aria-label="Build useful things."
          >
            <span>BUILD</span>
            <span className={styles.orange}>USEFUL</span>
            <span>
              THINGS<span className={styles.period}>.</span>
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
            <p>
              我是 Jerryszz，做全栈开发，也构建 AI 应用。
              <br className={styles.desktopBreak} />
              从界面、数据到任务执行，把想法做成可用的软件。
            </p>
            <div className={styles.actions}>
              <a className={styles.solid} href="#projects">
                查看作品 <span aria-hidden="true">↘</span>
              </a>
              <a
                className={styles.textLink}
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={styles.section}
          aria-labelledby="projects-title"
        >
          <h2 id="projects-title" className={styles.sectionTitle} data-reveal>
            精选作品
          </h2>
          {lead ? (
            <article className={styles.feature} data-reveal>
              <div className={styles.featureCopy}>
                <h3>
                  <Link href={`/projects/${lead.slug}`}>
                    {lead.title} <span aria-hidden="true">↗</span>
                  </Link>
                </h3>
                <p className={styles.description}>{lead.description}</p>
                <p className={styles.projectStatus}>{lead.status}</p>
                <Link
                  href={`/projects/${lead.slug}`}
                  className={styles.textLink}
                >
                  查看项目 <span aria-hidden="true">↗</span>
                </Link>
              </div>
              {lead.cover ? (
                <figure className={styles.featureImage}>
                  <Link
                    href={`/projects/${lead.slug}`}
                    className={styles.productWindow}
                    aria-label={`了解 ${lead.title}`}
                  >
                    <Image
                      src={lead.cover}
                      alt={lead.coverAlt ?? lead.title}
                      width={1440}
                      height={1000}
                      sizes="(max-width: 760px) 90vw, 50vw"
                    />
                  </Link>
                  <figcaption>{lead.coverCaption}</figcaption>
                </figure>
              ) : null}
            </article>
          ) : null}
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
                >
                  <ProjectArt project={project} />
                  <h3>
                    {project.title}
                    <span aria-hidden="true">↗</span>
                  </h3>
                  <p>{project.description}</p>
                  <p className={styles.projectStatus}>{project.status}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {explorations.length ? (
          <section
            className={styles.explorations}
            aria-labelledby="explorations-title"
            data-reveal
          >
            <h2 className={styles.sectionTitle} id="explorations-title">
              更多探索
            </h2>
            <div className={styles.explorationList}>
              {explorations.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        <Link href="/projects" className={styles.allProjects}>
          全部作品 <span aria-hidden="true">↗</span>
        </Link>

        <section
          className={styles.about}
          aria-labelledby="about-title"
          data-reveal
        >
          <h2 id="about-title">
            聊聊下一件
            <br />
            值得做的事<span>.</span>
          </h2>
          <div>
            <p>
              我关注软件工程、全栈开发与 AI
              应用方向。欢迎交流项目、技术选择和工作机会。
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
                关于我 <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </HomeMotion>
  );
}
