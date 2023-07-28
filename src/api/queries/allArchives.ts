
// TODO: increase limit to 100
export const allArchives = `
  query AllArchive($height: Int!) {
    archives(first: 2) {
      id
      media {
        id
        title
        asset {
          url(transformation: {image: {resize: {fit: scale, height: $height}}, document: {output: {format: webp}}})
          width
          height
          mimeType
        }
      }
    }
  }
`

export type ArchiveListItem = {
  id: string;
  media: {
    id: string;
    title?: string;
    asset: {
      url: string;
      mimeType: string;
      height: number;
      width: number;
    }
  }
  year: string;
}

export type AllArchivesResponse = {
  archives: ArchiveListItem[];
}