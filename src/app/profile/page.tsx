import {
  Branding,
  Experience,
  Lines,
  Contacts,
  Skills,
  ManifestoNew,
  LogoContainer,
} from "./modules";
import { BodyOverlay } from "./BodyOverlay";
import styles from "./page.module.sass";
import { cn } from "@/utils/css";

export default function ProfilePage() {
  return (
    <>
      <BodyOverlay />
      <main className={cn(styles.main)}>
        <ManifestoNew />
        <Skills />
        <LogoContainer />
        <Branding />
        <Contacts />
        <Experience />
        <Lines />
      </main>
    </>
  );
}
