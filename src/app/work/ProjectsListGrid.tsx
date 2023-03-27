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
import { ProjectTypes } from "@/api/typings/project";
import Image from "next/image";

const api = 'https://jsonplaceholder.typicode.com/photos'

type Project = {
  title: string;
  thumbnailUrl: string;
}

const fetchProjects = async () => {
  try {
    const res = await queryClient<AllProjectsResponse>(allProjects, { height: 240 })
    console.log(res.projects)
    return res.projects
  } catch(e) {
    console.error(e)
    return []
  }
}

const sortProjectsByDate = (a: ProjectThumbnailResponse, b: ProjectThumbnailResponse) =>
  new Date(a.year) < new Date(b.year) ? 1 : -1

const sortProjectsByType = (a: ProjectThumbnailResponse, b: ProjectThumbnailResponse): 0 | -1 | 1 => {
  if(a.type === b.type) return 0;
  if(a.type === "ux_ui") return -1;
  if(a.type === "branding") return 1;

  return 1;
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
      console.log('sort by type')
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

const createHeaderLabel = (header: { count: number, label: string }): string => `${header.label}(${header.count})`

const groupProjectsByType = (projects: ProjectThumbnailResponse[]) => (
  projects.reduce((acc, project, index) => {
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

interface ProjectsListGridProps {
  onHover: (t: string) => void;
  onLeave: () => void;
}

export default async function ProjectsListGrid(props: ProjectsListGridProps) {
  const { content } = pageTextProps()
  const projects = await fetchProjects()
  const projectsByType = groupProjectsByType(projects)
  const projectsByYear = groupProjectsByYear(projects)
  const headers = createHeaders(projectsByType, projects.length)
  console.log(projectsByYear)
  // TODO: rework project grid placement
  return (
    <>
      <GridLayout>
        {headers.map((header, index) => (
          <GridItemCenter key={"header" + index}>
            <AnimatedText className={index === 0 ? styles.projectsLabel : styles.header} fixedDuration={content.fixedDuration} delay={content.delay}>{header}</AnimatedText>
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
                <Image fill  className={styles.thumbnail} src={project.cover.url} alt={project.title}/>
              </GridItemCenter>
              ))}
          </Fragment>
        ))}
      </GridLayout>
    </>
  )
}