import { queryClient } from "@/api/client";
import { ProjectType } from "@/api/typings/project";

export const nextProjectSlug = `
query NextProjectSlug($currentId: String) {
  projects(orderBy: year_DESC, first: 1, after: $currentId) {
    id
    slug
    title
    type
  }
}

`

export const firstProjectSlug = `
query FirstProjectSlug {
  projects(orderBy: year_DESC, first: 1) {
    id
    slug
    title
    type
  }
}
`

export type NextProjectData = {
  id: string;
  slug: string;
  title: string;
  type: ProjectType

}


export type NextProjectDataResponse = {
  projects: NextProjectData[]
}

export async function fetchNextProjectData(currentId: string) {
  const res = await queryClient<NextProjectDataResponse, { projects: [] }>(nextProjectSlug, {projects: []}, { currentId})
  let data = res.projects[0] ?? null
  if(!data) {
    const firstRes = await queryClient<NextProjectDataResponse, { projects: [] }>(firstProjectSlug, {projects: []}, { currentId})
    data = firstRes.projects[0]
  }

  return data as NextProjectData;
}