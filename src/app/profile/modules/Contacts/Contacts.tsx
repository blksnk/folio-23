"use client";

import { useTransition } from "@/utils/transition";
import styles from "./Contacts.module.sass";

import Link from "next/link";
import { cnl } from "@/utils/css";
import fontRepo from "@/app/fonts";

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
    url: "https://linkedin.com/in/jn-veigel",
  },
  // {
  //   title: "Email",
  //   url: "mailto:hello@veigel.studio",
  // },
];

export const Contacts = () => {
  const { transitionOut } = useTransition();
  const c = cnl(styles.hide, transitionOut);
  return (
    <section className={styles.contacts}>
      {contacts.map((contact, i) => (
        <Link
          href={contact.url}
          target="_blank"
          rel="noopener"
          key={"contact" + i}
          className={c(styles.contactLink, fontRepo.button.className)}
        >
          <span>{contact.title}</span>
          <span className={styles.arrow}>↙</span>
        </Link>
      ))}
    </section>
  );
};
