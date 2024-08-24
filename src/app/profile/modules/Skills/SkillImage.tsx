"use client";

import type { Skill } from "./Skills";
import Image from "next/image";
import styles from "./Skills.module.sass";
import { cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";

type SkillImageProps = {
  skill: Skill;
};

export const SkillImage = ({ skill }: SkillImageProps) => {
  const { transitionOut } = useTransition();
  const c = cnl(styles.hide, transitionOut);
  return (
    <div className={c(styles.skillLogoContainer)}>
      <Image src={skill.logo} alt={skill.name} height={48} width={48} />
    </div>
  );
};
