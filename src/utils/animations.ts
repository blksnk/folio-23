import { isConsecutiveLoad } from "@/utils/isConsecutiveLoad";

export const titleFixedDuration = 600;
export const contentFixedDuration = 600;

export const pageTextProps = () => {
    const consecutiveLoad = isConsecutiveLoad()
    const titleDelay = consecutiveLoad ? 0 : 2000
    console.log(consecutiveLoad)
    const infoDelay = titleDelay + 1200
  return {
    title: {
      fixedDuration: titleFixedDuration,
      delay: titleDelay,
    },
    content: {
      fixedDuration: contentFixedDuration,
      delay: infoDelay
    }
  }
}

