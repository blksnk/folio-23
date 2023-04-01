import { TextOnlySection } from "@/api/queries/sections";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { pageTextProps } from "@/utils/animations";
import styles from "./TextOnly.section.module.sass"

interface TextOnlyProps {
  section: TextOnlySection
}

const splitTextByParagraph = (text: string) => text.split('\n\n')

export default function TextOnly ({ section }: TextOnlyProps) {
  const { content } = pageTextProps()

  const paragraphs = splitTextByParagraph(section.text)
  return (
    <>
      <GridLayout className={styles.section}>
        <GridItemCenter className={styles.sectionTitle}>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay} className={styles.title}>{ section.title }</AnimatedText>
        </GridItemCenter>
        {paragraphs.map((p, index) => {
          const delay = content.delay * (index * 0.5 + 1)
          return  (
            <GridItemCenter className={styles.paragraphContainer} key={'paragraph' + index}>
              <AnimatedText fixedDuration={content.fixedDuration} delay={delay} className={styles.paragraph}>{ p }</AnimatedText>
            </GridItemCenter>
          )
        })}
      </GridLayout>
    </>
  )
}