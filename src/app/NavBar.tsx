import styles from "./NavBar.module.sass"
import Image from 'next/image'

type Link = {
  to: string;
  title: string;
}

const links: Link[] = [
  {
    to: "/",
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
  return (
    <nav id={styles.nav}>
      <a href="/" className={styles.linkContainer}>
        <Image
          src="./genmetsuLogo.svg"
          alt="Genmetsu Logo"
          width={32}
          height={36}
          priority
        />
      </a>
      {links.map((link, index) => {
        return (
          <a className={styles.linkContainer} href={link.to} key={index}>
            <span>{link.title}</span>
          </a>
        )
      })}
    </nav>
  )
}

export default NavBar
