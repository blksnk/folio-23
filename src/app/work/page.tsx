
import PageLayout from "@/layouts/PageLayout";
import TitleGrid from "@/components/TitleGrid";

import styles from './page.module.sass'
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { pageTextProps } from "@/utils/animations";
import ProjectsListGrid from "@/app/work/ProjectsListGrid";

const baseTitleText = "selected   work"

export default function Work() {
  const { title, content } = pageTextProps()
  let titleText = baseTitleText

  const updateTitle = (t: string) => {
    titleText = t;
  }

  const resetTitle = () => {
    titleText = baseTitleText
  }

  return (
  <PageLayout className={styles.page}>
    <TitleGrid fixedDuration={title.fixedDuration} delay={title.delay} className={styles.titleGrid} title={titleText}/>
    <ProjectsListGrid onHover={updateTitle} onLeave={resetTitle}/>
  </PageLayout>
  )
}

