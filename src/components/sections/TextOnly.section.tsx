import { TextOnlySection } from "@/api/queries/sections";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { pageTextProps } from "@/utils/animations";
import styles from "./TextOnly.section.module.sass"

interface TextOnlyProps {
  section: TextOnlySection
  delay: number;
}

const splitTextByParagraph = (text: string) => text.split('\n\n')

export default function TextOnly ({ section }: TextOnlyProps) {
  const { content } = pageTextProps()

  const paragraphs = splitTextByParagraph(section.text)
  return (
    <>
      <GridLayout className={styles.section}>
        <GridItemCenter className={styles.sectionTitle}>
          <AnimatedText whenVisible fixedDuration={content.fixedDuration} className={styles.title}>{ section.title }</AnimatedText>
        </GridItemCenter>
        {paragraphs.map((p, index) => {
          const d = content.delay * index * 0.5
          return  (
            <GridItemCenter className={styles.paragraphContainer} key={'paragraph' + index}>
              <AnimatedText whenVisible fixedDuration={content.fixedDuration} delay={d} className={styles.paragraph}>{ p }</AnimatedText>
            </GridItemCenter>
          )
        })}
      </GridLayout>
    </>
  )
}