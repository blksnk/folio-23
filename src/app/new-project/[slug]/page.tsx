import styles from "./newProject.module.sass"
import {
  GalleryBackground
} from "@/components/Gallery/GalleryBackground.component";
import { queryClient } from "@/api/client";
import { oneProject, ProjectDataResponse } from "@/api/queries/oneProject";

const coverSize = 1200

const fetchProjectData = async (slug: string) => {
  const res = await queryClient<ProjectDataResponse, { project: null }>(oneProject, { project: null }, { height: coverSize, slug })
  return res.project
}
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProjectData(params.slug)
  console.log(project)

  if(!project) {
    // TODO: redirect to not found
    return null
  }
  return (
    <main className={styles.main}>
      <GalleryBackground />
    </main>
  )
}