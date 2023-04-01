
export const centerImage = `
  ... on CenterImage {
    id
    sectionType
    title
    alignment
    size
    media {
      url
      mimeType
      id
    }
  }
`

export type CenterImageSection = {
  id: string;
  title: string;
  alignment?: "left" | "right" | "center";
  size: "big" | "huge";
  media: {
    url: string;
    mimeType: string;
    id: string;
  };
  sectionType: "CenterImage";
}

export const carousel = `
  ... on Carousel {
    id
    title
    description
    sectionType
    medias {
      url
      mimeType
      id
    }
  }
`

export type CarouselSection = {
    id: string;
    title: string;
    description?: string;
    medias: {
        url: string;
        mimeType: string;
        id: string;
    }[]
  sectionType: "Carousel"
}


export const textOnly = `
  ... on TextOnly {
    id
    title
    text
    sectionType
  }
`

export type TextOnlySection = {
  id: string;
  title: string;
  text: string;
  sectionType: "TextOnly";
}


export const sections = `
  sections {
    ${centerImage}
    ${carousel}
    ${textOnly}
  }
`

export type AnySection = CenterImageSection | CarouselSection | TextOnlySection;

export type SectionList = AnySection[]