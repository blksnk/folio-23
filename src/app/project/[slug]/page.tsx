import PageLayout from "@/layouts/PageLayout";
import AnimatedText, {
  AnimatedTextStaggered
} from "@/components/AnimatedText/AnimatedText";
import TitleGrid from "@/components/TitleGrid";
import { queryClient } from "@/api/client";
import { oneProject, ProjectDataResponse } from "@/api/queries/oneProject";
import { contentFixedDuration, pageTextProps } from "@/utils/animations";
import styles from './page.module.sass'
import Image from "next/image"
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { SectionList } from "@/api/queries/sections";
import Carousel from "@/components/sections/Carousel.section";
import TextOnly from "@/components/sections/TextOnly.section";
import CenterImage from "@/components/sections/CenterImage.section";
import {
  fetchNextProjectData,
} from "@/api/queries/nextProject";
import Link from "next/link";

const coverSize = 1200

const fetchProjectData = async (slug: string) => {
  const res = await queryClient<ProjectDataResponse, { project: null }>(oneProject, { project: null }, { height: coverSize, slug })
  return res.project
}

export default async function Project({ params }: { params: { slug: string } }) {
  const project = await fetchProjectData(params.slug)
  console.log(project)
  const { title, content } = pageTextProps()
  const projectAnimationDelay = content.delay + content.fixedDuration

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
        <GridLayout className={styles.header}>
          <GridItemCenter className={styles.client}>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{project.client}</AnimatedText>
          </GridItemCenter>

          <GridItemCenter className={styles.description}>
            <AnimatedTextStaggered fixedDuration={content.fixedDuration} delay={content.delay} staggerDelay={30}>{projectDescription}</AnimatedTextStaggered>
          </GridItemCenter>

          <GridItemCenter className={styles.year}>
            <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{projectDate}</AnimatedText>
          </GridItemCenter>
        </GridLayout>

        <GridLayout className={styles.info}>
          <GridItemCenter className={styles.briefTitle}>
            <AnimatedText fixedDuration={content.fixedDuration} delay={projectAnimationDelay} className={styles.title}>brief</AnimatedText>
          </GridItemCenter>

          <GridItemCenter className={styles.brief}>
            <AnimatedText fixedDuration={content.fixedDuration} delay={projectAnimationDelay} >{project.brief}</AnimatedText>
          </GridItemCenter>

            <GridLayout className={styles.grid2}>
              <GridItemCenter>
                <AnimatedText fixedDuration={content.fixedDuration} delay={projectAnimationDelay} className={styles.title}>tools</AnimatedText>
              </GridItemCenter>

              <GridItemCenter>
                <AnimatedText fixedDuration={content.fixedDuration} delay={projectAnimationDelay} >{projectTools}</AnimatedText>
              </GridItemCenter>
            </GridLayout>

          <GridLayout className={`${styles.grid2} ${styles.type}`}>
            <GridItemCenter>
              <AnimatedText fixedDuration={content.fixedDuration} delay={projectAnimationDelay} className={styles.title}>type</AnimatedText>
            </GridItemCenter>

            <GridItemCenter>
              <AnimatedText fixedDuration={content.fixedDuration} delay={projectAnimationDelay} >{projectType}</AnimatedText>
            </GridItemCenter>
          </GridLayout>
        </GridLayout>
        <RenderSections sections={project.sections} delay={projectAnimationDelay}/>
        <NextButton currentId={project.id}/>
      </PageLayout>
    </>
  )
}

function RenderSections (props: { sections: SectionList; delay: number }) {
  return (
    <>
      {props.sections.map((section) => {
        const sectionProps = {
          section,
          delay: props.delay,
        }
        switch(section.sectionType) {
          case "Carousel":
            return <Carousel { ...sectionProps } key={section.id}/>
          case "TextOnly":
            return <TextOnly { ...sectionProps } key={section.id}/>
          case "CenterImage":
            return <CenterImage { ...sectionProps } key={section.id}/>
          default:
            return null
        }
      })
      }
    </>
  )
}

async function NextButton ({ currentId }: { currentId: string }) {
  const projectData = await fetchNextProjectData(currentId)

  console.log(currentId, projectData.id)
  
  const href = `/project/${projectData.slug}`
  
  return (
    <div className={styles.nextProjectContainer}>
      <Link href={href} className={styles.nextProjectButton}>
        <AnimatedText whenVisible fixedDuration={contentFixedDuration} >next project</AnimatedText>
        <AnimatedText className={styles.nextProjectTitle} whenVisible fixedDuration={contentFixedDuration} >{projectData.title}</AnimatedText>
        <AnimatedText whenVisible fixedDuration={contentFixedDuration} >{projectData.type}</AnimatedText>
      </Link>
    </div>
  )
}