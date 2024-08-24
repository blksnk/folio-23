import { AnimatedTextStaggered } from "@/components/AnimatedText/AnimatedText";
import styles from "./Manifesto.module.sass";
import { cn } from "@/utils/css";

const manifestoText = `My design aesthetic is deeply inspired by the engaging contrast between raw emotions and their triggers.
My journey in design is a deliberate exploration of this fascinating interplay, which I channel into striking visual & interactive experiences.
Each new project is an adventure and an opportuniy to resonate with people.
creation is not just a process, but a journey through the human experience.`;

const manifestoBlocks = manifestoText.split("\n").map((s) => s.trim());

export const ManifestoNew = () => {
  return (
    <section className={cn(styles.manifesto)}>
      {manifestoBlocks.map((blockText, index) => (
        <article
          className={cn(styles.manifestoBlock)}
          key={"manifesto-block-" + index}
        >
          <AnimatedTextStaggered
            className={styles.manifestoText}
            fixedDuration={150}
            delay={2400 + 600 * index}
            staggerDelay={10}
            whenVisible
          >
            {blockText}
          </AnimatedTextStaggered>
        </article>
      ))}
    </section>
  );
};
