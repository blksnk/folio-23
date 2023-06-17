import styles from "./newProject.module.sass"
import { TextLine } from "@/components/AnimatedText/TextLine";
import { Logo } from "@/components/Logo.component";
import Link from "next/link";
import { FormattedProjectMedia } from "@/api/queries/oneProject";
export const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

interface LeftContentProps {
  media?: FormattedProjectMedia,
  hide?: boolean;
}

export const LeftContent = ({ media, hide }: LeftContentProps) => {
  return (
    <>
      <section className={styles.leftContent}>
        <div className={styles.leftColumn}>
          <Link href="/new" className={styles.logoContainer}>
            <Logo outline/>
          </Link>
          <div className={styles.leftColumnSpacerContainer}>
            <TextLine className={styles.leftColumnSpacer}>00</TextLine>
          </div>
          <ActiveMediaTitle media={media}/>
          <div className={l(styles.leftContentHorizontalTopLine, hide)}></div>
        </div>
        <div className={styles.rightColumn}></div>
        <div className={l(styles.leftContentLeftLine, hide)}></div>
        <div className={l(styles.leftContentRightLine, hide)}></div>
      </section>
    </>
  )
}

interface ActiveMediaTitleProps {
  media?: FormattedProjectMedia,
}

const ActiveMediaTitle = (props: ActiveMediaTitleProps) => {

  if(!props.media) return null
  return (
    <section className={styles.mediaTitleContainer}>

      <TextLine>{props.media.displayTitle}</TextLine>
    </section>
  )
}