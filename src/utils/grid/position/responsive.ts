import { Dimensions, Size } from '@/utils/grid/types';
import { responsiveMap } from '@/utils/responsive';
import { ProjectMedia } from '@/store/projectData';
import { PartialGridItem } from '@/utils/grid';

export const convertSizeToResponsive = (
  media: ProjectMedia,
  gridWidth: number
): Dimensions | Size => {
  // assume layout was made for desktop in project editor
  // const initialSize = media.size;
  const isDesktop = gridWidth === responsiveMap.columns.default - 2;
  if (isDesktop) return media.size;

  return getMobileMediaSize(media, gridWidth);

  // const roundFn = (n: number): number => {
  //   const decimal = n - Math.floor(n);
  //   if (decimal < 0.3) return Math.floor(n);
  //   return Math.ceil(n);
  // };
  // // compute new width and height based on current grid width
  // const widthRatio = initialSize.width / desktopGridWidth;
  // const heightRatio = initialSize.height / gridHeight;
  // const responsiveWidth = gridWidth * widthRatio;
  // const gridWidthRatio = desktopGridWidth / gridWidth;
  // const responsiveHeight = desktopGridHeight * heightRatio;
  // const gridHeightRatio = desktopGridHeight / gridHeight;
  // // if x and y are defined, compute responsive values for those as well
  // if (isDefined(initialSize.x) && isDefined(initialSize.y)) {
  //   const xRatio = initialSize.x / desktopGridWidth;
  //   const yRatio = initialSize.y / desktopGridWidth;
  //   const responsiveX = gridWidth * xRatio;
  //   const responsiveY = gridWidth * yRatio;
  //   // return full dimensions
  //   return {
  //     width: Math.max(roundFn(responsiveWidth - gridWidthRatio), 1),
  //     height: roundFn(responsiveHeight - gridHeightRatio),
  //     x: initialSize.x === 0 ? 0 : Math.round(responsiveX),
  //     y: Math.ceil(responsiveY),
  //   };
  // }
  // // return only size
  // return {
  //   width: roundFn(responsiveWidth),
  //   height: roundFn(responsiveHeight),
  // };
};

const getMobileMediaSize = (media: ProjectMedia, gridWidth: number): Size => {
  const width = gridWidth;
  const height =
    media.mediaHeight && media.mediaWidth
      ? Math.round((media.mediaHeight / media.mediaWidth) * width)
      : media.size.height;
  return {
    width,
    height,
  };
};

export const convertMediasResponsive = (
  medias: ProjectMedia[],
  gridWidth: number
): PartialGridItem<{ media: ProjectMedia }>[] => {
  const isTablet = gridWidth === responsiveMap.columns.tablet - 2;
  const isMobile = gridWidth === responsiveMap.columns.mobile;

  if (isMobile) {
    return medias
      .sort((a, b) => {
        if (a.size.y === undefined || b.size.y === undefined) return 0;
        if (a.size.y < b.size.y) return -1;
        if (a.size.y > b.size.y) return 1;
        if (a.size.y === b.size.y) {
          if (
            a.size.x === undefined ||
            b.size.x === undefined ||
            a.size.x === b.size.x
          )
            return 0;
          if (a.size.x < b.size.x) return -1;
          if (a.size.x > b.size.x) return 1;
        }
        return 0;
      })
      .map((media) => {
        const size = getMobileMediaSize(media, gridWidth);
        return {
          id: media.id,
          ...size,
          extraData: {
            media: media,
          },
        };
      });
  }

  return medias.map((media) => {
    const size = isTablet
      ? convertSizeToResponsive(media, gridWidth)
      : media.size;
    return {
      id: media.id,
      ...size,
      extraData: {
        media: media,
      },
    };
  });
};
