"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type CSSProperties,
} from "react";
import styles from "./Blobs.module.sass";
import { isTablet } from "@/utils/breakpoints";
import { cn } from "@/utils/css";
import { useTransition } from "@/utils/transition";

type Vec2<T = number> = {
  x: T;
  y: T;
};

const randomColor = (): string => {
  const randomValue = () => Math.round(Math.random() * 255);
  const r = randomValue(),
    g = randomValue(),
    b = randomValue();
  return `rgb(${r}, ${g}, ${b})`;
};

const randomCoord = (containerSize: number): number => {
  return Math.round(Math.random() * containerSize) + containerSize * 0.25;
};

const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const randomPosition = (containerSize: number): Vec2 => {
  const x = randomCoord(containerSize);
  const y = randomCoord(containerSize);
  const args: [number, number, number, number] = [
    0,
    containerSize,
    -containerSize,
    containerSize / 2,
  ];
  return {
    x: mapRange(x, ...args),
    y: mapRange(y, ...args),
  };
};

const randomSize = (maxSize = 100, minSize = 10): number => {
  return Math.round(Math.max(minSize, Math.random() * maxSize));
};

const mapRange = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

interface BlobProps {
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  color: string;
  offset: Vec2;
  offsetAmount: number;
  grayscale?: boolean;
}

const randomBlobProps = (
  containerSize: number,
  maxBlobSize?: number,
  minBlobSize?: number,
  fixedColor?: string
): Omit<BlobProps, "offset" | "offsetAmount"> => {
  return {
    ...randomPosition(containerSize),
    color: fixedColor ?? randomColor(),
    height: randomSize(maxBlobSize, minBlobSize),
    width: randomSize(maxBlobSize, minBlobSize),
    angle: parseFloat(randomFloat(0, 180).toFixed(2)),
  };
};

const createRandomBlobs = (
  count: number,
  containerSize: number,
  maxBlobSize?: number,
  minBlobSize?: number,
  colors?: string[]
): Omit<BlobProps, "offset" | "offsetAmount">[] =>
  Array(count)
    .fill({})
    .map((_, index) =>
      randomBlobProps(
        containerSize,
        maxBlobSize,
        minBlobSize,
        colors
          ? colors[Math.floor(Math.random() * (colors.length - 1))] ?? undefined
          : undefined
      )
    );

const createInitBlobProps = (
  count: number
): Omit<BlobProps, "offset" | "offsetAmount" | "className">[] =>
  Array(count)
    .fill({})
    .map((_) => ({
      x: 0,
      y: 0,
      color: "rgb(189,189,189)",
      height: 50,
      width: 50,
      angle: 0,
    }));

type Dimensions = {
  width: number;
  height: number;
};

interface BlobsProps {
  count?: number;
  colors?: string[];
  maxBlobSize?: number;
  minBlobSize?: number;
  offsetAmount?: number;
  className?: string;
  grayscale?: boolean;
  overlay?: boolean;
  fill?: boolean;
  size?: number | (() => number | Dimensions) | Dimensions;
  mixBlendMode?: CSSProperties["mixBlendMode"];
}

const isNumber = (n: unknown): n is number =>
  typeof n === "number" && !isNaN(n);
const numberToDimensions = (n: number): Dimensions => ({ height: n, width: n });

export const Blobs = ({
  count = 10,
  maxBlobSize,
  minBlobSize,
  offsetAmount = 10,
  className,
  grayscale,
  colors,
  overlay,
  fill,
  size,
  mixBlendMode,
}: BlobsProps): JSX.Element => {
  const { transitionOut } = useTransition();
  const computeSize = useCallback((): Dimensions => {
    if (typeof size === "number") return { height: size, width: size };
    if (typeof size === "function") {
      const externalSize = size();
      if (isNumber(externalSize))
        return { height: externalSize, width: externalSize };
      return externalSize;
    }
    if (
      typeof window === "undefined" ||
      !isNumber(window.innerWidth) ||
      !isNumber(window.innerHeight)
    )
      return numberToDimensions(10);
    if (fill)
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    const sidePaddingPx = 9.5 * 16;
    // make it take a larger screen portion if mobile
    const fifths = isTablet() ? 4 : 2;
    return numberToDimensions(
      Math.min(
        window.innerHeight - sidePaddingPx,
        (window.innerWidth / 5) * fifths
      )
    );
  }, []);

  const [circleSize, setCircleSize] = useState(numberToDimensions(10));

  const refreshCircleSize = () => {
    setCircleSize(computeSize());
  };

  minBlobSize =
    minBlobSize ?? Math.min(circleSize.height, circleSize.width) * 0.5;
  maxBlobSize =
    maxBlobSize ?? Math.max(circleSize.height, circleSize.width) * 1.5;

  const [blobs, refreshBlobs] = useReducer(
    () =>
      createRandomBlobs(
        count ?? 10,
        Math.max(circleSize.height, circleSize.width),
        maxBlobSize,
        minBlobSize,
        colors
      ),
    count,
    createInitBlobProps
  );
  const [mousePos] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(true);

  const polarities = useMemo(
    () =>
      Array(count)
        .fill(0)
        .map((_) => ({
          x: randomFloat(-1, 1),
          y: randomFloat(-1, 1),
        })),
    [count]
  );

  const updateBlobsWithTransition = () => {
    setTransition(true);
    refreshBlobs();
  };

  useEffect(() => {
    refreshCircleSize();
    window.addEventListener("resize", refreshCircleSize);

    return () => {
      window.removeEventListener("resize", refreshCircleSize);
    };
  }, []);

  const startBlobRefreshInterval = useCallback(() => {
    refreshCircleSize();
    setTimeout(() => {
      updateBlobsWithTransition();
    }, 900);

    return setInterval(() => {
      updateBlobsWithTransition();
    }, 2400);
  }, []);

  useEffect(() => {
    const intervalId = startBlobRefreshInterval();

    return () => clearInterval(intervalId);
  }, []);

  const blobsWithOffset = useMemo<Omit<BlobProps, "offsetAmount">[]>(
    () =>
      blobs.map((blob, index) => ({
        ...blob,
        offset: {
          x: mousePos.x * polarities[index].x,
          y: mousePos.y * polarities[index].y,
        },
      })),
    [mousePos, polarities, blobs]
  );

  const containerStyle = useMemo(() => {
    return {
      ...circleSize,
      mixBlendMode: mixBlendMode ?? "hard-light",
    };
  }, [circleSize, mixBlendMode]);

  const klass = useMemo(
    () =>
      cn(
        styles.blobCircle,
        className ?? "",
        [styles.hide, transitionOut],
        [styles.overlay, overlay],
        // [styles.grayscale, grayscale],
        [styles.fill, fill]
      ),
    [transitionOut, overlay, grayscale]
  );

  return (
    <div
      className={klass}
      onClick={updateBlobsWithTransition}
      style={containerStyle}
    >
      {blobsWithOffset.map((blob, index) => (
        <Blob
          transition={transition}
          offsetAmount={offsetAmount ?? 0}
          {...blob}
          key={index}
          grayscale={grayscale}
        />
      ))}
    </div>
  );
};

const Blob = (props: BlobProps & { transition: boolean }): JSX.Element => {
  const { x, y, offset, offsetAmount, height, width, color, angle, grayscale } =
    props;
  const transform = `translateZ(0) translate(calc(${x}px + ${offset.x} * ${offsetAmount}px), calc(${y}px + ${offset.y} * ${offsetAmount}px)) rotate(${angle}deg)`;
  const w = `${width}px`;
  const h = `${height}px`;
  const style = {
    transform,
    background: color,
    width: w,
    height: h,
  };

  const className = cn(styles.blob, [styles.grayscale, grayscale]);

  return <div className={className} style={style} />;
};
