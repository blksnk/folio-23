"use client"

import styles from './page.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import Link from "next/link";
import Image from "next/image";
import { LineGroup } from "@/components/Lines/LineGroup";
import { RendererProps } from "@/app/new/Renderer.component";
import { useState } from "react";

export const formatNumber = (n: number): string => n < 10 ? "0" + n : String(n);
const extractYear = (date: string) => date.split('-')[0];
const l = (lineClass: string) => `${styles.line} ${lineClass}`


const Logo = (): JSX.Element => {
  return (
    <Link href="/" className={styles.sideContainer}>
      <Image
        src="/genmetsuLogo.svg"
        alt="Genmetsu Logo"
        width={32}
        height={36}
        priority
      />
    </Link>
  )
}

interface ArrowProps {
  down?: boolean;
  disabled?: boolean;
}

export const Arrow = (props: ArrowProps) => {
  const klass = `${styles.arrow} ${props.down ? styles.arrowDown : ""} ${props.disabled ? styles.arrowDisabled : ""}`
  return (
    <div className={klass}>
      <Image
        src="/arrow.svg"
        alt={"Arrow " + (props.down ? "Down" : "Up")}
        width={14}
        height={12}
      />
    </div>
  )
}

interface PageLeftProps extends RendererProps {
  changeActiveIndex:  (n: (1 | -1)) => void;
  setActiveIndex: (n: number) => void;
}

export const PageLeft = (props: PageLeftProps) => {
  const [ hoveringIndex, setHoveringIndex ] = useState<number | null>(null)
  const active = (i: number) => i === props.activeIndex;
  const hovering = (i: number) => i === hoveringIndex;
  const activeProject = props.projects[props.activeIndex]
  const activeProjectId = activeProject?.id ?? "unknown id";
  const activeProjectColor = activeProject?.backgroundColor.hex ?? "#000000"
  const handleClick = (index: number) => () => props.setActiveIndex(index)
  const handleHover = (index: number) => () => setHoveringIndex(index);
  const handleLeave = () => setHoveringIndex(null)

  return (
    <section className={styles.pageLeft}>
      <div className={styles.leftSplit}>
        <div className={styles.lineLeft}></div>
        <div className={styles.lineRight}></div>
        <div className={styles.logoContainer}>
          <Logo/>
        </div>
        <div className={styles.colorContainer}>
          <TextLine className={styles.color} animatedTextProps={{ fixedDuration: 300, delay: 800}} >{activeProjectColor}</TextLine>
        </div>
        <div className={styles.indices}>
          {props.projects.map((_, index) => <TextLine onClick={handleClick(index)} onEnter={handleHover(index)} onLeave={handleLeave} animatedTextProps={{ fixedDuration: 300, delay: index * 600 }} active={active(index)} hovering={hovering(index)} key={index}>{formatNumber(index + 1)}</TextLine>)}
        </div>

        <div className={styles.titles}>
          {props.projects.map(({title}, index) => <TextLine onClick={handleClick(index)} onEnter={handleHover(index)} onLeave={handleLeave} animatedTextProps={{ fixedDuration: 300, delay: index * 600 }} active={active(index)} hovering={hovering(index)} key={index}>{title}</TextLine>)}
        </div>

        <div className={styles.profile}>
          <TextLine className={styles.name}>Jean-Nicolas Veigel</TextLine>
          <TextLine className={styles.description}>
            Creative designer with a focus on 3D, branding, UI and all things *experimental*.
            Based in Paris.
          </TextLine>
        </div>
      </div>
      <div className={styles.rightSplit}>
        <div className={l(styles.linesBottomCenter)}>
          <LineGroup count={10} spacing={14} direction="horizontal"/>
        </div>
        <div className={l(styles.lineVerticalTop)}></div>
        <div className={l(styles.lineVerticalBottom)}></div>

        <div className={styles.activeIdContainer}>
          <TextLine className={styles.activeId} animatedTextProps={{ fixedDuration: 300, delay: 800}} >{activeProjectId}</TextLine>
        </div>

        <div className={l(styles.linesCenterRight)}>
          <LineGroup count={3} spacing={6} direction="horizontal"/>
        </div>

        <div className={styles.info}>
          <div className={styles.type}>
            {props.projects.map(({type}, index) => <TextLine onClick={handleClick(index)} onEnter={handleHover(index)} onLeave={handleLeave} animatedTextProps={{ fixedDuration: 300, delay: index * 600 }} active={active(index)} hovering={hovering(index)} key={index}>{type}</TextLine>)}
          </div>
          <div className={styles.client}>
            {props.projects.map(({client}, index) => <TextLine onClick={handleClick(index)} onEnter={handleHover(index)} onLeave={handleLeave} animatedTextProps={{ fixedDuration: 300, delay: index * 600 }} active={active(index)} hovering={hovering(index)} key={index}>{client}</TextLine>)}
          </div>
          <div className={styles.year}>
            {props.projects.map(({year}, index) => <TextLine onClick={handleClick(index)} onEnter={handleHover(index)} onLeave={handleLeave} animatedTextProps={{ fixedDuration: 300, delay: index * 600 }} active={active(index)} hovering={hovering(index)} key={index}>{extractYear(year)}</TextLine>)}
          </div>
        </div>
        <div className={styles.arrowsContainer}>
          <button className={styles.arrowButton} onClick={() => props.changeActiveIndex(-1)}>
            <Arrow />
          </button>
          <button className={styles.arrowButton} onClick={() => props.changeActiveIndex(1)}>
            <Arrow down/>
          </button>
        </div>
      </div>
    </section>
  )
}