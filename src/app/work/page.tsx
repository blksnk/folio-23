import PageLayout from "@/layouts/PageLayout";
import TitleGrid from "@/components/TitleGrid";

import styles from './page.module.sass'
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import { AnimatedCharacter } from "@/components/AnimatedText/AnimatedCharacter";

export default function Work() {

  return (
    <PageLayout className={styles.page}>
      <TitleGrid className={styles.titleGrid} title={"work  highlight"}/>
      <GridLayout className={styles.workGrid}>
        <GridItemCenter>
          <AnimatedCharacter>projects</AnimatedCharacter>
        </GridItemCenter>
      </GridLayout>
    </PageLayout>
  )
}