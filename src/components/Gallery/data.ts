
export const landscapeRatios = [
  2.25,
  1.85,
  1.75,
  1.5,
  1.4,
  1.33,
  1.25,
]

export const portraitRatios = [
  0.4255319149,
  0.5405405405,
  0.5633802817,
  0.6666666667,
  0.7490636704,
  0.8,
]

export const allRatios = [
  ...landscapeRatios,
  ...portraitRatios,
  1, // take square ratio into account
]

export const getClosestRatio = (imgRatio: number): number => {
  const { diff, ratio } = allRatios.reduce((acc: { diff: number; ratio: number }, currentRatio) => {
    const currentDiff = Math.abs(currentRatio - imgRatio);
    if(currentDiff > acc.diff) return acc;
    return {
      diff: currentDiff,
      ratio: currentRatio,
    }
  }, { diff: Infinity, ratio: 1})
  return ratio;
}