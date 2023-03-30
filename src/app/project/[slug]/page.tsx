import PageLayout from "@/layouts/PageLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import TitleGrid from "@/components/TitleGrid";
import { queryClient } from "@/api/client";
import { oneProject, ProjectDataResponse } from "@/api/queries/oneProject";
import { pageTextProps } from "@/utils/animations";
import styles from './page.module.sass'
import Image from "next/image"

const coverSize = 1200

const fetchProjectData = async (slug: string) => {
  const res = await queryClient<ProjectDataResponse, { project: null }>(oneProject, { project: null }, { height: coverSize, slug })
  console.warn(res)
  return res?.project ?? null
}

export default async function Project({ params }: { params: { slug: string } }) {
  console.log(params)
  const project = await fetchProjectData(params.slug)
  if(!project) {
    console.log(project)
    return null
    // router.push('/')
  }

  const { content } = pageTextProps()

  console.log(project)
  return (
    <>
      <Image className={styles.cover} src={project.cover.url} alt={project.title + " cover"} width={coverSize} height={coverSize} />
      <PageLayout className={styles.page}>
        <TitleGrid className={styles.titleGrid} title={project.displayTitle}/>
      </PageLayout>
    </>
  )
}
