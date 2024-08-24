import { cn } from "@/utils/css";
import type { Skill } from "./Skills";
import { SkillImage } from "./SkillImage";
import { TextLine } from "@/components/AnimatedText/TextLine";
import styles from "./Skills.module.sass";
import { SkillLine } from "./SkillLine";

type SkillCardProps = { skill: Skill; index: number; showLine?: boolean };

export const SkillCard = ({ skill, index, showLine }: SkillCardProps) => {
  return (
    <article className={cn(styles.skillCard)}>
      <SkillImage skill={skill} />
      <TextLine
        className={styles.skillName}
        animatedTextProps={{
          fixedDuration: 600,
          delay: 1300 + 300 * index,
        }}
      >
        {skill.name}
      </TextLine>
      {showLine && <SkillLine />}
    </article>
  );
};
