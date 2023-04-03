import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { Fragment } from "react";
import styles from "./ProjectsListGrid.module.sass"
import { queryClient } from "@/api/client";
import {
  allProjects,
  AllProjectsResponse,
  ProjectThumbnailData
} from "@/api/queries/allProjects";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { pageTextProps } from "@/utils/animations";
import { ProjectType, ProjectTypes } from "@/api/typings/project";
import Image from "next/image";
import Link from "next/link";

const fetchProjects = async () => {
  const res = await queryClient<AllProjectsResponse, { projects: never[]}>(allProjects, {projects: []}, { height: 240 })
  return res.projects
}

const sortProjectsByDate = (a: ProjectThumbnailData, b: ProjectThumbnailData) =>
  new Date(a.year) < new Date(b.year) ? 1 : -1

const projectTypeSortingOrder = Object.fromEntries(ProjectTypes.map((type, index) => ([ type, index + 1 ])))

const sortProjectsByType = (a: ProjectThumbnailData, b: ProjectThumbnailData): number => {
  return projectTypeSortingOrder[a.type] - projectTypeSortingOrder[b.type]
}

const groupProjectsByYear = (projects: ProjectThumbnailData[]) => {
  const byYear = projects.sort(sortProjectsByDate).reduce((acc, project, index) => {
    const year = project.year.split('-')[0]
    if(acc[year]) {
      acc[year].push(project)
    } else {
      acc[year] = [ project ]
    }
    // sort all projects by type on last iteration
    if(index === projects.length - 1) {
      Object.keys(acc).forEach(k => {
        acc[k] = acc[k].sort(sortProjectsByType)
      })
    }
    return acc
  }, {} as { [k: string] : ProjectThumbnailData[] })
  return Object
    .entries(byYear)
    .map(([year, projects]) => ({ year, projects }))
    .sort((a, b) => a.year < b.year ? 1 : -1 )
}

const formatNumber = (n: number): string => n < 10 ? "0" + n : String(n);

const createHeaderLabel = (header: { count: number, label: string }) => ({ label: header.label, count: `(${formatNumber(header.count)})`})

const groupProjectsByType = (projects: ProjectThumbnailData[]) => (
  projects.reduce((acc, project) => {
    switch(project.type) {
      case "ux_ui":
      case "print":
      case "branding":
        acc[project.type].count ++;
        acc[project.type].projects.push(project)
        break;
      default:
        acc.other.count ++;
        acc.other.projects.push(project)
    }

    return acc;
  }, {
    ux_ui: {
      label: "ux/ui",
      count: 0,
      projects: [] as ProjectThumbnailData[],
    },
    print: {
      label: "print",
      count: 0,
      projects: [] as ProjectThumbnailData[],
    },
    branding: {
      label: "branding",
      count: 0,
      projects: [] as ProjectThumbnailData[],
    },
    other: {
      label: "other",
      count: 0,
      projects: [] as ProjectThumbnailData[],
    }
  })
)



type ProjectsByType = ReturnType<typeof groupProjectsByType>;

const createHeaders = (projectsByType: ProjectsByType, totalCount: number) => {
  return [
    {label: "projects", count: totalCount},
    ...Object.values(projectsByType)
  ].map(createHeaderLabel)
}

const projectTypeColumnMap = Object.fromEntries(ProjectTypes.map((type, index) => [type, Math.min(index + 2, 5)]));
const getYearRowCount = (projectsCount: number) => Math.ceil(projectsCount / 5)

const createProjectLink = (project: { slug: string }) => '/project/' + project.slug

export default async function ProjectsListGrid() {
  const { content } = pageTextProps()
  const projects = await fetchProjects()
  const projectsByType = groupProjectsByType(projects)
  const projectsByYear = groupProjectsByYear(projects)
  const headers = createHeaders(projectsByType, projects.length)
  return (
    <>
      <GridLayout className={styles.headerContainer}>
        {headers.map((header, index) => (
          <GridItemCenter key={"header" + index}>
            <span>
              <AnimatedText className={index === 0 ? styles.projectsLabel : styles.header} fixedDuration={content.fixedDuration} delay={content.delay}>{header.label}</AnimatedText>
              <AnimatedText className={styles.headerCount} fixedDuration={content.fixedDuration} delay={content.delay}>{header.count}</AnimatedText>
            </span>
          </GridItemCenter>
        ))}
      </GridLayout>
      <GridLayout className={styles.container}>
        {projectsByYear.map(({ year, projects: projectsOfTheYear }, yearIndex) => (
          <Fragment key={year}>
            <GridItemCenter className={styles.year} style={{ gridRowEnd: "span " + getYearRowCount(projectsOfTheYear.length) }} >
              <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay + 600 + 600 * yearIndex}>{year}</AnimatedText>
            </GridItemCenter>
            {projectsOfTheYear.map((project, index) => (
              <GridItemCenter style={{ gridColumn: projectTypeColumnMap[project.type], animationDelay: content.delay + 1200 + 600 * yearIndex + 'ms', animationDuration: 900 + 300 * index + 'ms'}} className={styles.thumbnailContainer} key={project.id}>
                <Link href={createProjectLink(project)}>
                  <Image fill sizes="(max-width: 600px) 20vw, 15vw" className={styles.thumbnail} src={project.cover.url} alt={project.slug}/>
                </Link>
              </GridItemCenter>
              ))}
          </Fragment>
        ))}
      </GridLayout>
    </>
  )
}