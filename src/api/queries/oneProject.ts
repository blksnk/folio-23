import { SectionList, sections } from "@/api/queries/sections";
import { ProjectListItemData } from "@/api/queries/allProjects";

export const oneProject = `
  query OneProject($slug: String!, $width: Int!) {
    project(where: {slug: $slug}) {
      cover {
        url(
          transformation: {image: {resize: {fit: scale, width: $width}}, document: {output: {format: webp}}}
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
      backgroundColor {
        hex
        css
      }
      medias {
      ... on GalleryMedia {
        id
        title
        asset {
          width
          height
          url(
            transformation: {image: {resize: {fit: scale, width: $width}}, document: {output: {format: webp}}}
          )
          mimeType
        }
      }
    }
      ${sections}
    }
  }
`

export interface ProjectMedia {
  id: string;
  asset: {
    url: string;
    width: number;
    height: number;
    mimeType: string;
  },
  title: string;
}

export interface ProjectData extends ProjectListItemData {
  title: string;
  displayTitle: string;
  tools: string[];
  description?: string;
  client: string;
  brief: string;
  medias: ProjectMedia[];
  sections: SectionList;
  backgroundColor: {
    hex: string;
    css: string;
  }
}

export type ProjectDataResponse = {
  project: ProjectData;
}

export interface FormattedProjectMedia {
  displayTitle: string;
  imgRatio: number;
  closestRatio: number;
  url: string;
  id: string;
  isVideo: boolean;
}

export interface FormattedProject extends ProjectData {
  formattedMedias: FormattedProjectMedia[];
}