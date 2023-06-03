import { SectionList, sections } from "@/api/queries/sections";
import { ProjectListItemData } from "@/api/queries/allProjects";

export const oneProject = `
  query OneProject($slug: String!, $height: Int!) {
    project(where: {slug: $slug}) {
      cover {
        url(
          transformation: {image: {resize: {fit: scale, height: $height}}, document: {output: {format: webp}}}
        )
        mimeType
      }
      id
      slug
      title
      displayTitle
      tools
      type
      year
      description
      client
      brief
      ${sections}
    }
  }
`

export interface ProjectData extends ProjectListItemData {
  title: string;
  displayTitle: string;
  tools: string[];
  description?: string;
  client: string;
  brief: string;
  sections: SectionList
}

export type ProjectDataResponse = {
  project: ProjectData;
}