import styles from './explore.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import fontRepo from "@/app/fonts";
import Link from "next/link";
import { combineClasses } from "@/utils/css";

const titleKlass = `${fontRepo.button.className} ${styles.title}`
const createProjectLink = (slug: string) => '/project/' + slug

interface ExploreProps {
  slug: string;
  hide?: boolean;
  redirectTo: (url: string ) => void;
}

export const Explore = (props: ExploreProps) => {
  const containerKlass = combineClasses(styles.container, [styles.hide, props.hide])
  const href = createProjectLink(props.slug)
  const triggerPageTransitionOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    props.redirectTo(href)
    console.log("click")
  }
   return (
     <Link onClick={triggerPageTransitionOnClick} className={containerKlass} href={href}>
       <TextLine className={styles.topText}>dive deeper</TextLine>

       <h2 className={titleKlass}>Explore</h2>

       <TextLine className={styles.bottomText}>view contents</TextLine>
     </Link>
   )
}