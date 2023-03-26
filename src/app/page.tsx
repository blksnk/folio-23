import PageLayout from "@/layouts/PageLayout";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import fonts from "./fonts.module.sass"
import fontRepo from "@/app/fonts";
import ProjectsListGrid from "@/app/ProjectsListGrid";
import { Suspense } from "react";

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
          <AnimatedText fixedDuration={infoDuration} delay={infoDelay}>{"Jean-Nicolas\nVeigel"}</AnimatedText>
        </GridItemCenter>
        <GridItemCenter>
          <AnimatedText fixedDuration={infoDuration} delay={infoDelay} >{"Multidisciplinary\nDesigner"}</AnimatedText>
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
      <ProjectsListGrid/>
    </PageLayout>
  )
}
