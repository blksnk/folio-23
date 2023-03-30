
export const centerImage = `
  ... on CenterImage {
    id
    media {
      url
      mimeType
    }
    title
  }
`

export type CenterImageSection = {
  id: string;
  title: string;
  media: {
    url: string;
    mimeType: string;
  }
}

export const carousel = `
  ... on Carousel {
    id
    label
    description
    media {
      url
      mimeType
    }
  }
`

export type CarouselSection = {
    id: string;
    label?: string;
    description?: string;
    media: {
        url: string;
        mimeType: string;
    }[]
}

export const sections = `
  sections {
    ${centerImage}
    ${carousel}
  }
`