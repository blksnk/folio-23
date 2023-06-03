import styles from './explore.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import fontRepo from "@/app/fonts";

const titleKlass = `${fontRepo.button.className} ${styles.title}`

export const Explore = () => {
   return (
     <button className={styles.container}>
       <TextLine className={styles.topText}>dive deeper</TextLine>

       <h2 className={titleKlass}>Explore</h2>

       <TextLine className={styles.bottomText}>view project contents</TextLine>
     </button>
   )
}