import { CarouselSection } from "@/api/queries/sections";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { pageTextProps } from "@/utils/animations";
import Image from "next/image"
import styles from "./Carousel.section.module.sass"

interface CarouselProps {
  section: CarouselSection
}

export default function Carousel ({ section }: CarouselProps) {
  const { content } = pageTextProps()
  return (
    <section className={styles.section}>
      <GridLayout className={styles.header}>
        <GridItemCenter>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay} className={styles.title}>{ section.title }</AnimatedText>
        </GridItemCenter>
        <GridItemCenter className={styles.prev}>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>prev</AnimatedText>
        </GridItemCenter>
        <GridItemCenter className={styles.next}>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>next</AnimatedText>
        </GridItemCenter>
      </GridLayout>
      <div className={styles.scroller}>
        {section.medias.map((media, index) =>
          <Image fill key={media.id} src={media.url} alt={section.title + index}/>
        )}
      </div>
      {section.description &&
        <GridItemCenter className={styles.description}>
          <AnimatedText fixedDuration={content.fixedDuration} delay={content.delay}>{ section.description }</AnimatedText>
        </GridItemCenter>
      }
    </section>
  )
}