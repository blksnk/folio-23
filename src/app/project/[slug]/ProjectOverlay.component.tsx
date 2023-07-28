import s from "./newProject.module.sass"
import { l } from "@/app/project/[slug]/LeftContent";

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