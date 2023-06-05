import styles from './page.module.sass'
import {
  allProjects,
  AllProjectsResponse,
} from "@/api/queries/allProjects";
import { Renderer } from "@/app/new/Renderer.component";
import { queryClient } from "@/api/client";
import { headers } from "next/headers"


const fetchProjects = async () => {
  const res = await queryClient<AllProjectsResponse, { projects: never[]} >(allProjects, {projects: []}, { height: 2700 })
  return res.projects
}


export default async function Home() {
  const headersList = headers()
  const city = headersList.get('x-request-city') ?? ""
  const weather = headersList.get('x-request-weather') ?? ""
  const projects = await fetchProjects()
  const weatherProps = {
    city,
    weather
  }
  return (
    <main className={styles.main}>
      <Renderer projects={projects} weatherProps={weatherProps}></Renderer>
    </main>
  )
}

