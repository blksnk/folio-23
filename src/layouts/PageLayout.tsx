import { ReactNode, SuspenseProps } from "react";
import styles from "./PageLayout.module.sass"

interface PageLayoutProps {
  children: ReactNode | SuspenseProps["children"];
  paddingTop?: boolean,
  className?: string;
}

export default function PageLayout({ children, paddingTop, className }: PageLayoutProps) {
  const klass = `${styles.page} ${paddingTop ? styles.paddingTop : ''} ${className ?? ''}`
  return (
    <main className={klass}>
      {children}
    </main>
  )
}