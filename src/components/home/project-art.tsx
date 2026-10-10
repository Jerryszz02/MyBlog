import Image from "next/image";
import type { ContentItem } from "@/lib/content";
import styles from "./home.module.css";

export function ProjectArt({ project }: { project: ContentItem }) {
  if (project.slug === "trainote")
    return (
      <div className={`${styles.projectArt} ${styles.trainArt}`}>
        <div className={styles.trainWord} aria-hidden="true">
          Train.
          <br />
          Record.
          <br />
          Repeat.
        </div>
        <div className={styles.phone} aria-hidden="true">
          <span className={styles.island} />
          <small>TRAINOTE / TODAY</small>
          <strong>自己的训练节奏</strong>
          <div className={styles.phoneBlock}>从上次训练继续 →</div>
          <div className={styles.phoneBlock}>
            训练记录
            <div className={styles.bars}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className={styles.phoneBlock}>饮食 · 历史 · 回顾</div>
        </div>
        <span className={styles.artCaption}>结构示意 · 非产品截图</span>
      </div>
    );
  if (project.slug === "daily-news")
    return (
      <div className={`${styles.projectArt} ${styles.newsArt}`}>
        <div className={styles.newsWord} aria-hidden="true">
          Signal
          <br />
          over
          <br />
          noise.
        </div>
        <div className={styles.newsLines} aria-hidden="true">
          <span>Daily News / 多领域中文阅读</span>
          <span>来源 → 摘要 → 原文</span>
          <span>沿着线索，继续阅读</span>
        </div>
        <span className={styles.artCaption}>信息结构示意</span>
      </div>
    );
  return (
    <div className={`${styles.projectArt} ${styles.pokerArt}`}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt ?? project.title}
          fill
          sizes="(max-width: 700px) 90vw, 30vw"
        />
      ) : null}
      <div className={styles.pokerWord} aria-hidden="true">
        YOUR
        <br />
        NEXT
        <br />
        MOVE.
      </div>
      <span className={styles.artCaption}>{project.coverCaption}</span>
    </div>
  );
}
