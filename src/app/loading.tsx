import PageLayout from "@/layouts/PageLayout";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import styles from "./loading.module.sass";
import { Blobs } from "@/components/Blobs/Blobs.component";
import { Logo } from "@/components/Logo.component";

export default function Loading() {
  return (
    <PageLayout className={styles.page}>
      <div className={styles.blobsContainer}>
        <Blobs count={9} className={styles.blobs} />
      </div>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <AnimatedText staggerDelay={150}>loading</AnimatedText>
    </PageLayout>
  );
}
