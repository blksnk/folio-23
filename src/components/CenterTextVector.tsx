import Image from "next/image";
import styles from "./CenterTextVector.module.sass"

export default function CenterTextVector () {
  return (
    <div className={styles.textContainer}>
      <Image src='/genmetsuText.svg' height={339} width={80} alt="Genmetsu logo text" priority/>
    </div>
  )
}
