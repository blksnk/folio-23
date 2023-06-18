import s from "./newProject.module.sass"
import { l } from "@/app/new-project/[slug]/LeftContent";
import styles from "@/app/new-project/[slug]/newProject.module.sass";

interface ProjectOverlayProps {
  hide?: boolean
}

export const ProjectOverlay = ({ hide }: ProjectOverlayProps) => {
  return (
    <>
      <div className={l(s.lineTop, hide)}></div>
      <div className={l(s.lineRight, hide)}></div>
      <div className={l(s.lineBottom, hide)}></div>
      <div className={l(s.lineAcrossLeft, hide)}></div>
    </>
  )
}