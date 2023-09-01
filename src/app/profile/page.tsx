"use client"

import styles from "./page.module.sass"
import Link from "next/link";
import Image from "next/image";
import { Blobs } from "@/components/Blobs.component";
import { combineClasses } from "@/utils/css";
import fontRepo from "@/app/fonts";
import { useTransition } from "@/utils/transition";
import { MouseEventHandler } from "react";
import { Logo } from "@/components/Logo.component";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { Manifesto } from "@/app/profile/Manifesto";
import { Skills } from "@/app/profile/Skills";

const contacts = [
  {
    title: "Instagram",
    url: "https://www.instagram.com/veigel.studio/",
  },
  {
    title: "Twitter",
    url: "https://twitter.com/jn_veigel",
  },
  {
    title: "Github",
    url: "https://github.com/blksnk",
  },
  {
    title: "Linkedin",
    url: "https://linkedin.com/in/jn_veigel",
  },
  {
    title: "Email",
    url: "mailto:hello@veigel.studio",
  },
];

const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

export default function ProfilePage() {
  const { redirectTo, transitionOut } = useTransition()
  return (
    <main className={styles.main}>
      <section className={styles.leftContent}>
        <Image src="/branding.svg" fill alt="veigel.studio" className={styles.brandingImg}/>
        <Blobs count={9} hide={transitionOut}/>
        <Image src="/branding.svg" fill alt="veigel.studio" className={styles.brandingImg}/>
        <div className={styles.contactsContainer}>
          {contacts.map((contact, i)=>
          <Link
            href={contact.url}
            target="_blank" rel="noopener"
            key={"contact" + i}
            className={combineClasses(styles.contactLink, fontRepo.button.className)}
          >
            <span>{contact.title}</span>
            <span className={styles.arrow}>↙</span>
          </Link>
          )}
        </div>
      </section>
      <div className={l(styles.lineLeft, transitionOut)}></div>
      <div className={l(styles.lineBottomLeft, transitionOut)}></div>
      <div className={l(styles.lineCenterLeft, transitionOut)}></div>
      <div className={l(styles.lineTopLeft, transitionOut)}></div>
      <LogoContainer
        redirectTo={redirectTo}
        transitionOut={transitionOut}
      />
      <SideScroller hide={transitionOut}/>
    </main>
  )
}

const LogoContainer = ({ redirectTo, transitionOut }: Omit<ReturnType<typeof useTransition>, "setTransitionOut">) => {
  const redirectToHome: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    redirectTo('/')
  }
  return (
    <div className={styles.corner}>
    <Link href="/" onClick={redirectToHome} className={styles.logoContainer}>
      <Logo outline/>
    </Link>
      <TextLine className={styles.spacer}>01</TextLine>
      <div className={l(styles.lineRight, transitionOut)}></div>
      <div className={l(styles.lineFarRight, transitionOut)}></div>
      <div className={l(styles.lineLogoBottom, transitionOut)}></div>
    </div>
  )
}

const SideScroller = ({ hide }: { hide?: boolean}) => {
  return (
    <section className={styles.sideScroller}>
      <Manifesto hide={hide}/>
      <Skills hide={hide}/>
    </section>
  )
}