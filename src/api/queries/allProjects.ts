import { ProjectType } from "@/api/typings/project";

export const allProjects = `
  query AllProjects($height: Int!) {
    projects {
      title
      id
      type
      year
      cover {
        id
        url(
          transformation: {image: {resize: {height: $height, fit: scale}}, document: {output: {format: webp}}}
        )
        height
        width
        mimeType
      }
    }
  }
`


export type ProjectThumbnailResponse = {
  title: string;
  id: string;
  year: string;
  type: ProjectType;
  cover: {
    id: string;
    url: string;
    mimeType: string;
    height: number;
    width: number;
  }
}

export type AllProjectsResponse = {
  projects: ProjectThumbnailResponse[]
}