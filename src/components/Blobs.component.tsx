'use client'

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import variables from '../app/variables.module.sass'
import styles from './Blobs.module.sass'
import { isTablet } from "@/utils/breakpoints";

type Vec2<T = number> = {
  x: T;
  y: T;
}

const randomColor = (): string => {
  const randomValue = () => Math.round(Math.random() * 255);
  const r = randomValue(), g = randomValue(), b = randomValue();
  return `rgb(${r}, ${g}, ${b})`
}

const randomCoord = (containerSize: number): number => {
  return Math.round(Math.random() * containerSize) + containerSize * 0.25;
}

const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

const randomPosition = (containerSize: number): Vec2 => {
  const x = randomCoord(containerSize)
  const y = randomCoord(containerSize)
  const args = [ 0 , containerSize, -containerSize, containerSize / 2 ]
  const pos = {
    x: mapRange(x, ...args),
    y: mapRange(y, ...args),
  }
  return pos
}

const randomSize = (maxSize = 100, minSize = 10,): number => {
  return Math.round(Math.max(minSize, Math.random() * maxSize));
}

const mapRange = (value: number, x1: number, y1: number, x2: number, y2: number): number => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

interface BlobProps {
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  color: string;
  offset: Vec2,
  offsetAmount: number,
}


const randomBlobProps = (containerSize: number, maxBlobSize?: number, minBlobSize?: number): Omit<BlobProps, 'offset' | 'offsetAmount'> => {

  return ({
    ...randomPosition(containerSize),
    color: randomColor(),
    height: randomSize(maxBlobSize, minBlobSize),
    width: randomSize(maxBlobSize, minBlobSize),
    angle: parseFloat(randomFloat(0, 180).toFixed(2)),
  })
}

const createRandomBlobs = (
  count: number,
  containerSize: number,
  maxBlobSize?: number,
  minBlobSize?: number,
): Omit<BlobProps, 'offset' | 'offsetAmount'>[] => Array(count)
  .fill({})
  .map(_ => randomBlobProps(containerSize, maxBlobSize, minBlobSize))

const createInitBlobProps = (
  count: number,
): Omit<BlobProps, 'offset' | 'offsetAmount'>[] => Array(count)
  .fill({})
  .map(_ => ({
    x: 0,
    y: 0,
    color: 'rgb(0, 0, 0)',
    height: 50,
    width: 50,
    angle: 0,
  }))

interface BlobsProps {
  count?: number;
  maxBlobSize?: number;
  minBlobSize?: number;
  offsetAmount?: number;
}


export const Blobs = ({ count = 10, maxBlobSize, minBlobSize, offsetAmount = 10 }: BlobsProps): JSX.Element => {

  const computeSize = useCallback((): number => {
    const sidePaddingPx = parseFloat(variables.linesPadding) * 16
    if(typeof window === "undefined") return 400
    // make it take a larger screen portion if mobile
    console.log(isTablet())
    const fifths = isTablet() ? 4 : 2
    return Math.min(window.innerHeight - sidePaddingPx, window.innerWidth / 5 * fifths);
  }, [])

  const [circleSize, setCircleSize] = useState(400);
  const refreshCircleSize = () => {
    console.log('called', typeof window === "undefined")
    setCircleSize(computeSize())
  }

  minBlobSize = minBlobSize ?? circleSize * 0.5;
  maxBlobSize = maxBlobSize ?? circleSize * 1.5;

  const [blobs, refreshBlobs] = useReducer(() => createRandomBlobs(count ?? 10, circleSize, maxBlobSize, minBlobSize), count, createInitBlobProps)
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [transition, setTransition] = useState(true);
  const [intervalId, setIntervalId] = useState(0);

  const polarities = useMemo(() => Array(count).fill(0).map(_ => ({
    x: randomFloat(-1, 1),
    y: randomFloat(-1, 1),
  })), [ count ]);

  const updateBlobsWithTransition = () => {
    setTransition(true);
    refreshBlobs();
  }

  useEffect(() => {

    refreshCircleSize()
    window.addEventListener('resize', refreshCircleSize);

    return () => {
      window.removeEventListener('resize', refreshCircleSize);
    };
  }, [])

  const startBlobRefreshInterval = useCallback(() => {
    updateBlobsWithTransition()
    refreshCircleSize()

    const intervalId = setInterval(() => {
      updateBlobsWithTransition()
    }, 2400)
    console.log(intervalId)
    setIntervalId(intervalId as unknown as number)

    return intervalId
  }, [])

  useEffect(() => {
    const intervalId = startBlobRefreshInterval()

    return () => clearInterval(intervalId)
  }, [])

  const blobsWithOffset = useMemo<Omit<BlobProps, 'offsetAmount'>[]>(() => blobs.map((blob, index) => ({
    ...blob,
    offset: {
      x: mousePos.x * polarities[index].x,
      y: mousePos.y * polarities[index].y,
    }
  })), [ mousePos, polarities, blobs])

  const containerStyle = useMemo(() => {
  return {
    height: circleSize,
    width: circleSize,
  }
  }, [ circleSize ])

  return (
    <div className={styles.blobCircle} onClick={updateBlobsWithTransition} style={containerStyle}>
      {blobsWithOffset.map((blob, index) => <Blob transition={transition} offsetAmount={offsetAmount ?? 0} {...blob} key={index}/>)}
    </div>
  )
}

const Blob = (props: BlobProps & { transition: boolean }): JSX.Element => {
  const {x, y, offset, offsetAmount, height, width, color, angle} = props;
  const transform = `translateZ(0) translate(calc(${x}px + ${offset.x} * ${offsetAmount}px), calc(${y}px + ${offset.y} * ${offsetAmount}px)) rotate(${angle}deg)`
  const w = width + "px";
  const h = height + "px";
  const background = color;
  const style = {
    transform,
    background,
    width: w,
    height: h,
  }

  return (<div className={styles.blob} style={style}/>)
}