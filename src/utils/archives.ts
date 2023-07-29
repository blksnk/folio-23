import { ArchiveListItem } from "@/api/queries/allArchives";
import { GridLayoutData } from "@/utils/grid/types";
import { generateGridLayout } from "@/utils/grid";
import { Breakpoint } from "@/utils/responsive";

export const archiveItemsSizes = { // [height, width, probability]
  default: {
    s: [2, 1, 1],
    m: [2, 2, 0.3],
    l: [5, 3, 0.1],
    xl: [5, 4, 0.1],
  },
  tablet: {
    xs: [1, 1, 1],
    s: [1, 2, 0.7],
    m: [2, 2, 0.3],
    l: [4, 4, 0.1],
    xl: [5, 7, 0.1],
  },
  mobile: {
    s: [1, 1, 1],
    m: [1, 2, 0.7],
    l: [2, 3, 0.3],
    xl: [3, 4, 0.2],
    xxl: [5, 6, 0.1],
  }
} as const;

export type Color = {
  rgb: string;
  values: number[];
  hex: string;
}

export type ArchiveListItemWithColor = ArchiveListItem & {
  color: Color
}

export const archivesToGridItems = (archives: ArchiveListItemWithColor[], breakpoint: Breakpoint) => {
  return archives.map((archive) => {
    const sizes = Object.values(archiveItemsSizes[breakpoint])
    let sizeIndex = 0;
    for (let i = sizes.length - 1; i > 0; i--) {
      const pickSize = Math.random() > 1 - sizes[i][2];
      if(pickSize) {
        sizeIndex = i;
        break;
      }
    }

    const [height, width] = Object.values(archiveItemsSizes[breakpoint])[sizeIndex];
    return {
      id: archive.id,
      height,
      width,
      extraData: archive,
    }
  }).sort(() => Math.random() > 0.5 ? 1 : -1)
}


export const archivesToGridLayout = (archives: ArchiveListItemWithColor[], breakpoint: Breakpoint): GridLayoutData<ArchiveListItemWithColor> => {
  return generateGridLayout(archivesToGridItems(archives, breakpoint), {
    rows: 12,
    columns: breakpoint === "tablet" ? 11 : 10,
    marginX: 1,
    marginY: 1,
    axis: 'y',
    fillAvailable: true,
  })
}