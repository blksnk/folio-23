import { CenterImageSection } from "@/api/queries/sections";
import { GridItemCenter } from "@/layouts/GridLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import { contentFixedDuration } from "@/utils/animations";
import Image from "next/image"
import styles from "./CenterImage.section.module.sass"

interface CenterImageProps {
  section: CenterImageSection
}

export default function CenterImage ({ section }: CenterImageProps) {
  const imageKlass = styles[section.size ?? "big"]
  const imageContainerKlass = `${styles.imageContainer} ${styles[section.alignment ?? "center"]}`
  return (
    <>
      <GridItemCenter className={imageContainerKlass}>
        <Image className={imageKlass} fill src={section.media.url} alt={section.title} />
      </GridItemCenter>
      <GridItemCenter className={styles.description}>
        <AnimatedText whenVisible fixedDuration={contentFixedDuration}>{ section.title }</AnimatedText>
      </GridItemCenter>
    </>
  )
}
