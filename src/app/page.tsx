import PageLayout from "@/layouts/PageLayout";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import fonts from "./fonts.module.sass"
import fontRepo from "@/app/fonts";
import styles from './page.module.sass'

const description = 'Jean-nicolas veigel is a french multi-disciplinary designer.\nHe creates for and with individuals, artists, start-ups\n& well established companies around the world.'

export default function Home() {
  const titleCharKlass = (small?: boolean) => `${small ? fonts.titleSmall : fonts.titleChar} ${fontRepo.title.bitmap.className}`
  const title = titleCharKlass()
  const titleSmall = titleCharKlass(true)
  const titleDuration = 900
  const titleDelay = 2000
  const infoDuration = 600
  const infoDelay = titleDelay + 1200
  return (
    <PageLayout paddingTop>
      <GridLayout>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>g</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>e</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>n</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
        </GridItemCenter>
        <GridItemCenter>
        </GridItemCenter>
        <GridItemCenter>
        <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>m</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>e</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>t</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>s</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>u</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter></GridItemCenter>
        <GridItemCenter>
        <AnimatedText delay={titleDelay} fixedDuration={titleDuration} className={titleSmall}>dot</AnimatedText>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>a</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>r</AnimatedCharacter>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedCharacter delay={titleDelay} fixedDuration={titleDuration} className={title}>t</AnimatedCharacter>
        </GridItemCenter>
      </GridLayout>
      <GridLayout className={styles.infoRow}>
        <GridItemCenter>
          <AnimatedText fixedDuration={infoDuration} delay={infoDelay}>2018-present</AnimatedText>
        </GridItemCenter>
      <GridItemCenter className={styles.description}>
        <AnimatedText fixedDuration={infoDuration} delay={infoDelay} staggerDelay={30}>{description}</AnimatedText>
      </GridItemCenter>
        <GridItemCenter>
          <AnimatedText fixedDuration={infoDuration} delay={infoDelay}>available mid-2023</AnimatedText>
        </GridItemCenter>
      </GridLayout>
    </PageLayout>
  )
}
