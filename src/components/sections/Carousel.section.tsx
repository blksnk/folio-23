import { CarouselSection } from "@/api/queries/sections";
import GridLayout, { GridItemCenter } from "@/layouts/GridLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { contentFixedDuration } from "@/utils/animations";
import Image from "next/image"
import styles from "./Carousel.section.module.sass"

interface CarouselProps {
  section: CarouselSection;
  delay: number;
}

export default function Carousel ({ section, delay }: CarouselProps) {
  console.log(delay)
  return (
    <section className={styles.section}>
      <GridLayout className={styles.header}>
        <GridItemCenter>
          <AnimatedText whenVisible fixedDuration={contentFixedDuration} delay={delay} className={styles.title}>{ section.title }</AnimatedText>
        </GridItemCenter>
        <GridItemCenter className={styles.prev}>
          <AnimatedText whenVisible fixedDuration={contentFixedDuration} delay={delay + contentFixedDuration}>prev</AnimatedText>
        </GridItemCenter>
        <GridItemCenter className={styles.next}>
          <AnimatedText whenVisible fixedDuration={contentFixedDuration} delay={delay + contentFixedDuration}>next</AnimatedText>
        </GridItemCenter>
      </GridLayout>
      <div className={styles.scroller}>
        {section.medias.map((media, index) =>
          <Image
            fill
            key={media.id}
            src={media.url}
            alt={section.title + index}
            sizes="(max-width: 600px) 100vw, 40vw" />
        )}
      </div>
      {section.description &&
        <GridItemCenter className={styles.description}>
          <AnimatedText whenVisible fixedDuration={contentFixedDuration} delay={delay}>{ section.description }</AnimatedText>
        </GridItemCenter>
      }
    </section>
  )
}