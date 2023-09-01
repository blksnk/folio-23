import styles from "./page.module.sass"
import { TextLine } from "@/components/AnimatedText/TextLine";
import { replaceWithSpacesWhenHidden } from "@/utils/css";
import { textAnimation } from "@/utils/transition";

const manifestoText = `My name is Jean-Nicolas Veigel, a product designer and creative developer.

My design aesthetic is deeply inspired by the engaging contrast between raw emotions and their triggers. My journey in design is a deliberate exploration of this fascinating interplay, which I channel into the creation of striking interactive experiences.

Utilizing a mix of textures and shapes, I articulate these emotions in physical forms. My creative strategy employs experimental processes, allowing me to explore the untapped potential in design.

For me, creation is not just a process, but a journey through the human experience. Each project, a new adventure, is a chance to delve into the complexities of emotions, producing work that truly resonates with people.
`

interface ManifestoProps {
  hide?: boolean;
}

const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

export const Manifesto = ({ hide }: ManifestoProps) => {
  return (
    <section className={styles.manifesto}>
      <TextLine className={styles.manifestoTitle} animatedTextProps={textAnimation(hide)} active>{ replaceWithSpacesWhenHidden("Manifesto", hide) }</TextLine>
      <TextLine className={styles.manifestoText} animatedTextProps={textAnimation(hide, 600, 1500)}>{replaceWithSpacesWhenHidden(manifestoText, hide)}</TextLine>
      <div className={l(styles.lineManifestoLeft, hide)}></div>
      <div className={l(styles.lineManifestoRight, hide)}></div>
      <div className={l(styles.lineManifestoBottom, hide)}></div>
    </section>
  )
};
