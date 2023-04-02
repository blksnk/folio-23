
import PageLayout from "@/layouts/PageLayout";
import AnimatedText, {
  AnimatedTextStaggered
} from "@/components/AnimatedText/AnimatedText";
import styles from "../../loading.module.sass"

let count = 0;
let percentage = "0"

export default function Loading () {

  const intervalId = setInterval(() => {
    if(count === 100) {
      clearInterval(intervalId)
    } else {
      count += 25
      percentage = String(count)
    }
  }, 600)

  return (
    <PageLayout className={styles.page}>
    <AnimatedTextStaggered fixedDuration={500} staggerDelay={30}>loading project data...</AnimatedTextStaggered>
      <AnimatedText fixedDuration={300} className={styles.percentage}>{`${percentage}%`}</AnimatedText>

  </PageLayout>
)
}