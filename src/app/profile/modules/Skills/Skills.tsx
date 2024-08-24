import styles from "./Skills.module.sass";
import { SkillCard } from "./SkillCard";

const skillNames = [
  "Art Direction",
  "UX/UI Design",
  "Graphic Design",
  "Brand Identity",
  "3D Rendering",
  "Photo / Video",
  "Generative Art",
  "Web Dev",
];

export type Skill = {
  name: string;
  key: string;
  logo: string;
};

const skills: Skill[] = skillNames.map((name, index) => ({
  name,
  logo: `/skill_${index + 1}.svg`,
  key: `skill ${index}`,
}));

export const Skills = () => {
  return (
    <section className={styles.skills}>
      {skills.map((skill, index) => (
        <SkillCard
          skill={skill}
          key={skill.key}
          index={index}
          showLine={index < skills.length - 1}
        />
      ))}
    </section>
  );
};
