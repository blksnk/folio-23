import styles from "./newProject.module.sass"
import { TextLine } from "@/components/AnimatedText/TextLine";
import { Logo } from "@/components/Logo.component";
import Link from "next/link";
export const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`


export const LeftContent = () => {
  return (
    <>
      <section className={styles.leftContent}>
        <div className={styles.leftColumn}>
          <Link href="/new" className={styles.logoContainer}>
            <Logo outline/>
          </Link>
          <div className={styles.leftColumnSpacerContainer}>
            <TextLine  className={styles.leftColumnSpacer} active >00</TextLine>
          </div>
        </div>
        <div className={styles.rightColumn}></div>
        <div className={l(styles.leftContentLeftLine)}></div>
        <div className={l(styles.leftContentRightLine)}></div>
      </section>
    </>
  )
}
