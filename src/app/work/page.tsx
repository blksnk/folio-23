
import PageLayout from "@/layouts/PageLayout";
import TitleGrid from "@/components/TitleGrid";

import styles from './page.module.sass'
import { pageTextProps } from "@/utils/animations";
import ProjectsListGrid from "@/app/work/ProjectsListGrid";

const baseTitleText = "selected   work"

export default function Work() {
  const { title } = pageTextProps()

  return (
  <PageLayout className={styles.page}>
    <TitleGrid fixedDuration={title.fixedDuration} delay={title.delay} className={styles.titleGrid} title={baseTitleText}/>
    <ProjectsListGrid/>
  </PageLayout>
  )
}

