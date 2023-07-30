import styles from "./page.module.sass"
import { combineClasses, replaceWithSpacesWhenHidden } from "@/utils/css";
import { Logo } from "@/components/Logo.component";
import Link from "next/link";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { Breakpoint } from "@/utils/responsive";
import { MouseEventHandler } from "react";
import { numberToString } from "@/utils/math";

interface SideNavProps {
  hide?: boolean;
  breakpoint: Breakpoint;
  doPreview: boolean;
  totalCount: number;
  selectedIndex: number;
  redirectToHome: () => void;
}

const animatedTextProps = {
  fixedDuration: 600,
  delay: 0
};

const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

export const SideNav = ({ hide, redirectToHome, doPreview, totalCount, selectedIndex, breakpoint } : SideNavProps) => {

  const onLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    redirectToHome()
  }

  const hideCount = hide || !doPreview || breakpoint === "mobile"
  const currentIndexText = replaceWithSpacesWhenHidden(numberToString(selectedIndex + 1), hideCount);
  const totalCountText = replaceWithSpacesWhenHidden(String(totalCount), hideCount)

  return (
    <nav className={styles.sideNav}>
      <Link
        href="/"
        onClick={onLinkClick}
        className={ combineClasses(styles.logoContainer, [ styles.hide, hide ]) }
      >
        <Logo outline/>
      </Link>
      <TextLine className={styles.spacer}>01</TextLine>
      <div className={styles.countContainer}>
        <TextLine animatedTextProps={animatedTextProps} className={styles.count}>
          { currentIndexText }
        </TextLine>
        <TextLine animatedTextProps={animatedTextProps} className={styles.of}>
          { replaceWithSpacesWhenHidden('of', hideCount) }
        </TextLine>
        <TextLine animatedTextProps={animatedTextProps} className={styles.totalCount}>
          { totalCountText }
        </TextLine>
      </div>

      <div className={styles.pageTitleContainer}>
        <TextLine
          animatedTextProps={animatedTextProps}
          className={styles.pageTitle}
        >
          {replaceWithSpacesWhenHidden('Archives', hide || breakpoint === "mobile")}
        </TextLine>
      </div>
      <div className={l(styles.lineLeft, hide)}></div>
      <div className={l(styles.lineRight, hide)}></div>
      <div className={l(styles.lineFarRight, hide)}></div>
      <div className={l(styles.lineLogoTop, hide)}></div>
      <div className={l(styles.lineLogoBottom, hide)}></div>
      <div className={l(styles.lineBottom, hide)}></div>
    </nav>
  )
}