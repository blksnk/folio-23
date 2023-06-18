import s from "./newProject.module.sass"
import { ProjectData } from "@/api/queries/oneProject";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { combineClasses } from "@/utils/css";

interface ProjectInfoProps {
  project: ProjectData,
  hide?: boolean,
}

const animatedTextProps = { fixedDuration: 300, delay: 300 }

export const ProjectInfo = ({ project, hide }: ProjectInfoProps) => {
  const klass = combineClasses(s.projectInfoBlock, [s.hide, hide])
  return (
    <section className={s.projectInfo}>
      <div className={klass}>
        <TextLine animatedTextProps={animatedTextProps} active>title</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.title }</TextLine>
      </div>
      <div className={klass}>
        <TextLine animatedTextProps={animatedTextProps} active>client</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.client }</TextLine>
      </div>
      <div className={klass}>
        <TextLine animatedTextProps={animatedTextProps} active>type</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.type }</TextLine>
      </div>
      <div className={klass}>
        <TextLine animatedTextProps={animatedTextProps} active>made</TextLine>
        <TextLine animatedTextProps={animatedTextProps} hovering>{ project.year }</TextLine>
      </div>
    </section>
  )
}