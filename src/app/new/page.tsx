import styles from './page.module.sass'
import {
  allProjects,
  AllProjectsResponse,
} from "@/api/queries/allProjects";
import { Weather } from "@/app/new/Weather.component";
import { Timer } from "@/app/new/Timer.component";
import { Renderer } from "@/app/new/Renderer.component";
import { OverlayLines } from "@/app/new/Overlay.component";
import { queryClient } from "@/api/client";


const fetchProjects = async () => {
  const res = await queryClient<AllProjectsResponse, { projects: never[]} >(allProjects, {projects: []}, { height: 2700 })
  return res.projects
}


export default async function Home() {
  const projects = await fetchProjects()
  return (
    <main className={styles.main}>
      <Renderer projects={projects}></Renderer>
      <OverlayLines/>
      <section className={styles.dateAndWeather}>
        <Weather/>
        <Timer/>
      </section>
      <section className={styles.visual}>

      </section>

    </main>
  )
}

