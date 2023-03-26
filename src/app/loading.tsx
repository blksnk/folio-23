import PageLayout from "@/layouts/PageLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import styles from "./loading.module.sass"

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
      <AnimatedText fixedDuration={500}>loading</AnimatedText>
      <AnimatedText fixedDuration={300} className={styles.percentage}>{`${percentage}%`}</AnimatedText>

    </PageLayout>
  )
}