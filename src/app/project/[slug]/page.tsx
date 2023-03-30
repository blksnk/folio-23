import PageLayout from "@/layouts/PageLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import TitleGrid from "@/components/TitleGrid";
import { queryClient } from "@/api/client";
import { oneProject, ProjectDataResponse } from "@/api/queries/oneProject";
import { pageTextProps } from "@/utils/animations";
import styles from './page.module.sass'
import Image from "next/image"
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";

const coverSize = 1200

const fetchProjectData = async (slug: string) => {
  const res = await queryClient<ProjectDataResponse, { project: null }>(oneProject, { project: null }, { height: coverSize, slug })
  return res.project
}

export default async function Project({ params }: { params: { slug: string } }) {
  const project = await fetchProjectData(params.slug)
  const { title, content } = pageTextProps()

  if(!project) {
    // TODO: redirect to not found
    return null
  }

  const projectTools = project.tools.length > 0 ? project.tools.join(', ') : ""
  const projectDate = project.year.replaceAll('-', '/')
  const projectType = project.type.replaceAll('_', '/')
  const projectDescription = project.description ?? ""

  return (
    <>
      <Image className={styles.cover} src={project.cover.url} alt={project.title + " cover"} width={coverSize} height={coverSize} />
      <PageLayout className={styles.page}>
        <TitleGrid fixedDuration={title.fixedDuration} delay={title.delay} className={styles.titleGrid} title={project.displayTitle}/>
        <GridLayout>
          <GridItemCenter>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{project.client}</AnimatedText>
          </GridItemCenter>
          <GridItemCenter>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{projectType}</AnimatedText>
          </GridItemCenter>
          <GridItemCenter>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay} staggerDelay={30}>{projectDescription}</AnimatedText>
          </GridItemCenter>
          <GridItemCenter>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{projectTools}</AnimatedText>
          </GridItemCenter>
          <GridItemCenter>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{projectDate}</AnimatedText>
          </GridItemCenter>
        </GridLayout>
      </PageLayout>
    </>
  )
}
