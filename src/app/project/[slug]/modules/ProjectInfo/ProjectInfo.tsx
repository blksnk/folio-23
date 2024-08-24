"use client";

import s from "./ProjectInfo.module.sass";
import { ProjectData } from "@/api/queries/oneProject";
import fontRepo from "@/app/fonts";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";

interface ProjectInfoProps {
  project: ProjectData;
}

const animatedTextProps = { fixedDuration: 300, delay: 300 };

export const ProjectInfo = ({ project }: ProjectInfoProps) => {
  const { transitionOut } = useTransition();
  const c = cnl(s.hide, transitionOut);

  return (
    <>
      <h1 className={c(fontRepo.button.className, s.projectTitle)}>
        {project.title}
      </h1>
      <div className={c(s.projectInfo)}>
        <div className={c(s.client, s.info)}>
          <TextLine
            animatedTextProps={animatedTextProps}
            className={c(s.infoTitle)}
            hovering
          >
            client
          </TextLine>
          <TextLine
            animatedTextProps={animatedTextProps}
            className={c(s.infoData)}
            hovering
          >
            {project.client}
          </TextLine>
        </div>
        <div className={c(s.type, s.info)}>
          <TextLine
            animatedTextProps={animatedTextProps}
            className={c(s.infoTitle)}
            hovering
          >
            type
          </TextLine>
          <TextLine
            animatedTextProps={animatedTextProps}
            className={c(s.infoData)}
            hovering
          >
            {project.type}
          </TextLine>
        </div>
        <div className={c(s.year, s.info)}>
          <TextLine
            animatedTextProps={animatedTextProps}
            className={c(s.infoTitle)}
            hovering
          >
            year
          </TextLine>
          <TextLine
            className={c(s.infoData)}
            animatedTextProps={animatedTextProps}
            hovering
          >
            {project.year.substring(0, 4)}
          </TextLine>
        </div>
      </div>
    </>
  );
};
