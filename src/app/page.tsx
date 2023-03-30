import PageLayout from "@/layouts/PageLayout";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { titleCharKlass } from "@/app/fonts";
import styles from './page.module.sass'
import { headers } from "next/headers";
import { isConsecutiveLoad } from "@/utils/isConsecutiveLoad";
import { pageTextProps } from "@/utils/animations";

const description = 'Jean-nicolas veigel is a french multi-disciplinary designer.\nHe creates for and with individuals, artists, start-ups\n& well established companies around the world.'

export default function Home() {
  const consecutiveLoad = isConsecutiveLoad()

  const titleKlass = titleCharKlass()
  const titleSmall = titleCharKlass(true)

  const { title, content } = pageTextProps()
  return (
    <PageLayout className={styles.page}>
      <GridLayout className={styles.titleContainer}>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>g</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>e</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>n</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
        </GridItemCenter>
        <GridItemCenter>
        </GridItemCenter>
        <GridItemCenter>
        <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>m</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>e</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>t</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>s</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>u</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter></GridItemCenter>
        <GridItemCenter>
        <AnimatedText delay={title.delay} fixedDuration={title.fixedDuration} className={titleSmall}>dot</AnimatedText>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>a</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>r</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={title.delay} fixedDuration={title.fixedDuration} className={titleKlass}>t</AnimatedCharacter>
        </GridItemCenter>
      </GridLayout>
      <GridLayout className={styles.infoRow}>
        <GridItemCenter>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>2018-present</AnimatedText>
        </GridItemCenter>
      <GridItemCenter className={styles.description}>
        <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay} staggerDelay={30}>{description}</AnimatedText>
      </GridItemCenter>
        <GridItemCenter>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>available mid-2023</AnimatedText>
        </GridItemCenter>
      </GridLayout>
    </PageLayout>
  )
}
