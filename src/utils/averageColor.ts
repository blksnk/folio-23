import sharp from "sharp";
interface Size {
  width: number;
  height: number;
}
export type FastAverageColorRgb = [number, number, number];
export type FastAverageColorRgba = [number, number, number, number];
export type FastAverageColorRgbaWithThreshold = [number, number, number, number, number];
export type FastAverageColorIgnoredColor = FastAverageColorRgb | FastAverageColorRgba | FastAverageColorRgbaWithThreshold | Array<FastAverageColorRgb | FastAverageColorRgba | FastAverageColorRgbaWithThreshold>;
export interface FastAverageColorOptions {
  defaultColor?: FastAverageColorRgba;
  ignoredColor?: FastAverageColorIgnoredColor;
  mode?: 'precision' | 'speed';
  algorithm?: 'simple' | 'sqrt' | 'dominant';
  step?: number;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  silent?: boolean;
  crossOrigin?: string;
}
export interface FastAverageColorAlgorithmOptions {
  defaultColor: FastAverageColorRgba;
  ignoredColor: Array<FastAverageColorRgb | FastAverageColorRgba | FastAverageColorRgbaWithThreshold>;
  step: number;
}
export type FastAverageColorResource = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | null;
export interface FastAverageColorResult {
  rgb: string;
  rgba: string;
  hex: string;
  hexa: string;
  value: FastAverageColorRgba;
  isDark: boolean;
  isLight: boolean;
  error?: Error;
}

type RGBA = [number, number, number, number];
type RGB = RGBA | [number, number, number];

const MIN_SIZE = 10;
const MAX_SIZE = 100;

function prepareSizeAndPosition(originalSize: Size, options?: FastAverageColorOptions) {
  const srcLeft = 0;
  const srcTop =  0;
  const srcWidth = originalSize.width;
  const srcHeight = originalSize.height;
  let destWidth = srcWidth;
  let destHeight = srcHeight;
  if (options?.mode === 'precision') {
    return {
      srcLeft,
      srcTop,
      srcWidth,
      srcHeight,
      destWidth,
      destHeight
    };
  }
  let factor;
  if (srcWidth > srcHeight) {
    factor = srcWidth / srcHeight;
    destWidth = MAX_SIZE;
    destHeight = Math.round(destWidth / factor);
  }
  else {
    factor = srcHeight / srcWidth;
    destHeight = MAX_SIZE;
    destWidth = Math.round(destHeight / factor);
  }
  if (destWidth > srcWidth || destHeight > srcHeight ||
    destWidth < MIN_SIZE || destHeight < MIN_SIZE) {
    destWidth = srcWidth;
    destHeight = srcHeight;
  }
  return {
    srcLeft,
    srcTop,
    srcWidth,
    srcHeight,
    destWidth,
    destHeight
  };
}

function getDefaultColor(options: FastAverageColorOptions): RGBA {
  return getOption(options, 'defaultColor', [0, 0, 0, 0]) as RGBA;
}
function getOption(options: FastAverageColorOptions, name: string, defaultValue: unknown) {
  return (options[name] === undefined ? defaultValue : options[name]);
}

function toHex(num: number) {
  const str = num.toString(16);
  return str.length === 1 ? '0' + str : str;
}

function arrayToHex(arr: RGBA | RGB) {
  return '#' + arr.map(toHex).join('');
}

function isDark(color: RGB) {
  // http://www.w3.org/TR/AERT#color-contrast
  const result = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
  return result < 128;
}


function dominantAlgorithm(arr: number[], len: number, options: FastAverageColorAlgorithmOptions) {
  const colorHash = {};
  const divider = 24;
  const step = options.step;
  let max = [ 0, 0, 0, 0, 0 ];
  for (let i = 0; i < len; i += step) {
    const red = arr[i];
    const green = arr[i + 1];
    const blue = arr[i + 2];
    const alpha = arr[i + 3];

    const key = Math.round(red / divider) + ',' +
      Math.round(green / divider) + ',' +
      Math.round(blue / divider);
    if (colorHash[key]) {
      colorHash[key] = [
        colorHash[key][0] + red * alpha,
        colorHash[key][1] + green * alpha,
        colorHash[key][2] + blue * alpha,
        colorHash[key][3] + alpha,
        colorHash[key][4] + 1
      ];
    }
    else {
      colorHash[key] = [red * alpha, green * alpha, blue * alpha, alpha, 1];
    }
    if (max[4] < colorHash[key][4]) {
      max = colorHash[key];
    }
  }
  const redTotal = max[0];
  const greenTotal = max[1];
  const blueTotal = max[2];
  const alphaTotal = max[3];
  const count = max[4];
  return alphaTotal ? [
    Math.round(redTotal / alphaTotal),
    Math.round(greenTotal / alphaTotal),
    Math.round(blueTotal / alphaTotal),
    Math.round(alphaTotal / count)
  ] : options.defaultColor;
}

function simpleAlgorithm(arr: number[], len: number, options: FastAverageColorAlgorithmOptions) {
  let redTotal = 0;
  let greenTotal = 0;
  let blueTotal = 0;
  let alphaTotal = 0;
  let count = 0;
  const step = options.step;
  for (let i = 0; i < len; i += step) {
    const alpha = arr[i + 3];
    const red = arr[i] * alpha;
    const green = arr[i + 1] * alpha;
    const blue = arr[i + 2] * alpha;
    redTotal += red;
    greenTotal += green;
    blueTotal += blue;
    alphaTotal += alpha;
    count++;
  }
  return alphaTotal ? [
    Math.round(redTotal / alphaTotal),
    Math.round(greenTotal / alphaTotal),
    Math.round(blueTotal / alphaTotal),
    Math.round(alphaTotal / count)
  ] : options.defaultColor;
}

function sqrtAlgorithm(arr: number[], len: number, options: FastAverageColorAlgorithmOptions) {
  let redTotal = 0;
  let greenTotal = 0;
  let blueTotal = 0;
  let alphaTotal = 0;
  let count = 0;
  const ignoredColor = options.ignoredColor;
  const step = options.step;
  for (let i = 0; i < len; i += step) {
    const red = arr[i];
    const green = arr[i + 1];
    const blue = arr[i + 2];
    const alpha = arr[i + 3];
    redTotal += red * red * alpha;
    greenTotal += green * green * alpha;
    blueTotal += blue * blue * alpha;
    alphaTotal += alpha;
    count++;
  }
  return alphaTotal ? [
    Math.round(Math.sqrt(redTotal / alphaTotal)),
    Math.round(Math.sqrt(greenTotal / alphaTotal)),
    Math.round(Math.sqrt(blueTotal / alphaTotal)),
    Math.round(alphaTotal / count)
  ] : options.defaultColor;
}


function prepareResult(value: [number, number, number, number], error?: Error): FastAverageColorResult {
  const rgb = value.slice(0, 3) as [number, number, number];
  const rgba = [ value[0], value[1], value[2], value[3] / 255 ];
  const isDarkColor = isDark(value);
  return {
    value: [value[0], value[1], value[2], value[3]],
    rgb: 'rgb(' + rgb.join(',') + ')',
    rgba: 'rgba(' + rgba.join(',') + ')',
    hex: arrayToHex(rgb),
    hexa: arrayToHex(value),
    isDark: isDarkColor,
    isLight: !isDarkColor,
    error: error,
  };
}

function getColorFromArray4 (arr: number[] | Uint8Array | Uint8ClampedArray, options?: FastAverageColorOptions): FastAverageColorRgba {
  options = options || {};
  const bytesPerPixel = 4;
  const arrLength = arr.length;
  const defaultColor = getDefaultColor(options);
  if (arrLength < bytesPerPixel) {
    return defaultColor;
  }
  const len = arrLength - arrLength % bytesPerPixel;
  const step = (options.step || 1) * bytesPerPixel;
  let algorithm;
  switch (options.algorithm || 'sqrt') {
    case 'simple':
      algorithm = simpleAlgorithm;
      break;
    case 'sqrt':
      algorithm = sqrtAlgorithm;
      break;
    case 'dominant':
      algorithm = dominantAlgorithm;
      break;
    default:
      throw new Error("".concat(options.algorithm ?? "", " is unknown algorithm"));
  }
  // @ts-ignore
  return algorithm(arr as unknown as number[], len, {
    defaultColor: defaultColor,
    step: step
  }) as FastAverageColorRgba
}


export async function getAverageColor(resourceUrl: string, options?: FastAverageColorOptions) {
  const response = await fetch(resourceUrl);
  const arrayBuffer = await response.arrayBuffer();
  let input = Buffer.from(arrayBuffer);

  const left = 0
  const top = 0
  let pipe = await sharp(input);
  const metadata = await pipe.metadata();
  if (metadata.width && metadata.height) {
    const size = prepareSizeAndPosition({
      width: metadata.width,
      height: metadata.height,
    }, options);
    pipe = pipe.extract({
      left,
      top,
      width: size.srcWidth,
      height: size.srcHeight,
    }).resize(size.destWidth, size.destHeight);
  }
  const buffer = await pipe.ensureAlpha().raw().toBuffer();
  const pixelArray = new Uint8Array(buffer.buffer);
  return prepareResult(getColorFromArray4(pixelArray, options));
}

export const getAverageColors = async (mediaUrls: string[]) => {
  const colors = await Promise.all(mediaUrls.map((url) => getAverageColor(url, {
    mode: "speed",
    algorithm: "sqrt",
  })));
  return colors.map(c => ({
    values: c.value,
    hex: c.hex,
    rgb: c.rgb
  }));
}