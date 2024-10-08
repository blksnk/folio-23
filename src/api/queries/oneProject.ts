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
      medias(first: 100) {
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
          videoThumbnail {
            height
            width
            url(
              transformation: {image: {resize: {fit: scale, width: $width}}, document: {output: {format: webp}}}
            )
            mimeType
          }
        }
      }
    }
  }
`;

export interface ProjectMedia {
  id: string;
  asset: {
    url: string;
    width: number;
    height: number;
    mimeType: string;
  };
  videoThumbnail: {
    url: string;
    width: number;
    height: number;
    mimeType: string;
  } | null;
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
  backgroundColor: {
    hex: string;
    css: string;
  };
}

export type ProjectDataResponse = {
  project: ProjectData;
};

export interface FormattedProjectMedia {
  displayTitle: string;
  imgRatio: number;
  closestRatio: number;
  url: string;
  videoThumbnailUrl?: string;
  id: string;
  // TODO: add video support
  isVideo: boolean;
  isPortrait: boolean;
  width: number;
  height: number;
}

export interface FormattedProject extends ProjectData {
  formattedMedias: FormattedProjectMedia[];
}
