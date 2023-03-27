"use client"

import styles from "./NavBar.module.sass"
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from "next/navigation";


type LinkProps = {
  to: string;
  title: string;
}

const links: LinkProps[] = [
  {
    to: "/",
    title: "home",
  },
  {
    to: "/work",
    title: "work",
  },
  {
    to: "/archive",
    title: "archive",
  },
  {
    to: "/about",
    title: "about",
  },
]

const NavBar = () => {
  const activePath = usePathname()
  const linkKlass = (link: LinkProps) => `${styles.linkContainer} ${activePath === link.to ? styles.linkActive : ""}`
  return (
    <nav id={styles.nav}>
      <Link href="/" className={styles.sideContainer}>
        <Image
          src="/genmetsuLogo.svg"
          alt="Genmetsu Logo"
          width={32}
          height={36}
          priority
        />
      </Link>
      {links.map((link, index) => {
        return (
          <Link className={linkKlass(link)} href={link.to} key={index}>
            <span>{link.title}</span>
          </Link>
        )
      })}
      <div className={styles.sideContainer}>
      </div>
    </nav>
  )
}

export default NavBar
