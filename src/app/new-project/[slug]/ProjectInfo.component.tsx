import s from "./newProject.module.sass"
import { ProjectData } from "@/api/queries/oneProject";
import { TextLine } from "@/components/AnimatedText/TextLine";

interface ProjectInfoProps {
  project: ProjectData
}

const animatedTextProps = { fixedDuration: 300, delay: 300 }

export const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <section className={s.projectInfo}>
      <div className={s.projectInfoBlock}>
        <TextLine animatedTextProps={animatedTextProps} active>title</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.title }</TextLine>
      </div>
      <div className={s.projectInfoBlock}>
        <TextLine animatedTextProps={animatedTextProps} active>client</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.client }</TextLine>
      </div>
      <div className={s.projectInfoBlock}>
        <TextLine animatedTextProps={animatedTextProps} active>type</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.type }</TextLine>
      </div>
      <div className={s.projectInfoBlock}>
        <TextLine animatedTextProps={animatedTextProps} active>made</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.year }</TextLine>
      </div>
    </section>
  )
}