import { ProjectType } from "@/api/typings/project";

export const allProjects = `
  query AllProjects($height: Int!) {
    projects {
      id
      title
      client
      type
      year
      slug
      backgroundColor {
        hex
      }
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


export type ProjectListItemData = {
  slug: string;
  id: string;
  year: string;
  title: string;
  client: string;
  type: ProjectType;
  backgroundColor: {
    hex: string;
  };
  cover: {
    id: string;
    url: string;
    mimeType: string;
    height: number;
    width: number;
  }
}

export type AllProjectsResponse = {
  projects: ProjectListItemData[]
}