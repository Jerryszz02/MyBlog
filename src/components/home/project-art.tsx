import Image from "next/image";
import type { ContentItem } from "@/lib/content";
import styles from "./home.module.css";

export function ProjectArt({ project }: { project: ContentItem }) {
  if (project.slug === "trainote")
    return (
      <div
        className={`${styles.projectArt} ${styles.trainArt}`}
        role="img"
        aria-label="Trainote 主题插画：训练与记录，非产品截图"
      >
        <div className={styles.trainWord} aria-hidden="true">
          Train.
          <br />
          Record.
          <br />
          Repeat.
        </div>
        <div className={styles.phone} aria-hidden="true">
          <span className={styles.island} />
          <div className={styles.phoneBlock} />
          <div className={styles.bars}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.phoneBlock} />
        </div>
      </div>
    );
  if (project.slug === "info-board")
    return (
      <div
        className={`${styles.projectArt} ${styles.boardArt}`}
        role="img"
        aria-label="InfoBoard 主题插画：个人信息工作台，非产品截图"
      >
        <div className={styles.boardWord} aria-hidden="true">
          Make
          <br />
          space
          <br />
          for ideas.
        </div>
        <div className={styles.boardTiles} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  return (
    <div className={`${styles.projectArt} ${styles.pokerArt}`}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt ?? project.title}
          fill
          sizes="(max-width: 760px) 90vw, 30vw"
        />
      ) : null}
      <div className={styles.pokerWord} aria-hidden="true">
        YOUR
        <br />
        NEXT
        <br />
        MOVE.
      </div>
    </div>
  );
}
