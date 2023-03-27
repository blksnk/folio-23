import { isConsecutiveLoad } from "@/utils/isConsecutiveLoad";

export const pageTextProps = () => {
    const consecutiveLoad = isConsecutiveLoad()
    const titleDelay = consecutiveLoad ? 0 : 2000
    console.log(consecutiveLoad)
    const infoDelay = titleDelay + 1200
  return {
    title: {
      fixedDuration: 900,
      delay: titleDelay,
    },
    content: {
      fixedDuration: 600,
      delay: infoDelay
    }
  }
}