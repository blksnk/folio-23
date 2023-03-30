import { ProjectType } from "@/api/typings/project";
import { sections } from "@/api/queries/sections";
import { ProjectThumbnailData } from "@/api/queries/allProjects";

export const oneProject = `
  query OneProject($slug: String!, $height: Int!) {
    project(where: {slug: $slug}) {
    cover {
      url(
        transformation: {image: {resize: {fit: scale, height: $height}}, document: {output: {format: webp}}}
      )
      mimeType
    }
    slug
    title
    displayTitle
    tools
    type
    year
    description
    client
  }
  }
`

export interface ProjectData extends ProjectThumbnailData {
  title: string;
  displayTitle: string;
  tools: string[];
  description?: string;
  client?: string;
}

export type ProjectDataResponse = {
  project: ProjectData;
}