import s from "./newProject.module.sass"
import { l } from "@/app/new-project/[slug]/LeftContent";

export const ProjectOverlay = () => {
  return (
    <>
      <div className={l(s.lineTop)}></div>
      <div className={l(s.lineRight)}></div>
    </>
  )
}