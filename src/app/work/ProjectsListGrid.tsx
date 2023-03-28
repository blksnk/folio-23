import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { Fragment } from "react";
import styles from "./ProjectsListGrid.module.sass"
import { queryClient } from "@/api/client";
import {
  allProjects,
  AllProjectsResponse,
  ProjectThumbnailResponse
} from "@/api/queries/allProjects";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { pageTextProps } from "@/utils/animations";
import { ProjectType, ProjectTypes } from "@/api/typings/project";
import Image from "next/image";
import Link from "next/link";

const fetchProjects = async () => {
  try {
    const res = await queryClient<AllProjectsResponse>(allProjects, { height: 240 })
    return res.projects
  } catch(e) {
    console.error(e)
    return []
  }
}

const sortProjectsByDate = (a: ProjectThumbnailResponse, b: ProjectThumbnailResponse) =>
  new Date(a.year) < new Date(b.year) ? 1 : -1

const projectTypeSortingOrder = Object.fromEntries(ProjectTypes.map((type, index) => ([ type, index + 1 ]))) as { [k: ProjectType]: number }

const sortProjectsByType = (a: ProjectThumbnailResponse, b: ProjectThumbnailResponse): number => {
  return projectTypeSortingOrder[a.type] - projectTypeSortingOrder[b.type]
}

const groupProjectsByYear = (projects: ProjectThumbnailResponse[]) => {
  const byYear: {
    [k: string]: ProjectThumbnailResponse[]
  } = projects.sort(sortProjectsByDate).reduce((acc, project, index) => {
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
  }, {})
  return Object
    .entries(byYear)
    .map(([year, projects]) => ({ year, projects }))
    .sort((a, b) => a.year < b.year ? 1 : -1 )
}

const formatNumber = (n: number): string => n < 10 ? "0" + n : String(n);

const createHeaderLabel = (header: { count: number, label: string }) => ({ label: header.label, count: `(${formatNumber(header.count)})`})

const groupProjectsByType = (projects: ProjectThumbnailResponse[]) => (
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
      projects: [],
    },
    print: {
      label: "print",
      count: 0,
      projects: [],
    },
    branding: {
      label: "brand identity",
      count: 0,
      projects: [],
    },
    other: {
      label: "other",
      count: 0,
      projects: [],
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

const projectTypeColumnMap: {
  [k: typeof ProjectTypes[number]]: number
} = {
  ux_ui: 2,
  print: 3,
  branding: 4,
  other: 5,
}

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
                  <Image height={120} width={120} className={styles.thumbnail} src={project.cover.url} alt={project.slug}/>
                </Link>
              </GridItemCenter>
              ))}
          </Fragment>
        ))}
      </GridLayout>
    </>
  )
}