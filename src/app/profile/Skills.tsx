import styles from "./page.module.sass"
import { TextLine } from "@/components/AnimatedText/TextLine";
import { textAnimation } from "@/utils/transition";
import { combineClasses, replaceWithSpacesWhenHidden } from "@/utils/css";
import Image from "next/image";

const skillNames = [
  "Art Direction",
  "Interface Design",
  "Graphic Design",
  "Brand Identity",
  "3D Rendering",
  "Photography",
  "Generative Art",
  "Web Development",
]

type Skill = {
  name: string;
  key: string;
  logo: string;
}

const skills: Skill[] = skillNames.map((name, index) => ({
  name,
  logo: `/skill_${index + 1}.svg`,
  key: `skill ${index}`,
}))

export const Skills = ({ hide }: { hide?: boolean }) => {
  return (
    <>
      <TextLine className={styles.skillsTitle} active animatedTextProps={textAnimation(hide, 600)}>{replaceWithSpacesWhenHidden("what i offer", hide)}</TextLine>
      <section className={styles.skills}>
        {skills.map((skill, index) => <SkillCard skill={skill} key={skill.key} index={index}/>)}
      </section>
    </>
  )
}

const SkillCard = ({ hide, skill, index } : { hide?: boolean, skill: Skill, index: number }) => {
  return (
    <div className={combineClasses(styles.skillCard, [styles.hide, hide])}>
      <div className={styles.skillLogoContainer}>
        <Image src={skill.logo} alt={skill.name} height={60} width={90} />
      </div>
      <TextLine animatedTextProps={textAnimation(hide, 1500 + 300 * index)}>{replaceWithSpacesWhenHidden(skill.name, hide)}</TextLine>
    </div>
  )
}