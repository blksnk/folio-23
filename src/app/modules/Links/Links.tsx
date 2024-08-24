import { LinkBlock } from "./LinkBlock";
import styles from "./Links.module.sass";

const profileDescription = `Creative designer with a focus on 3D,
branding, UI and all things *experimental*.`;
const profileName = "Jean-Nicolas Veigel";
const archiveTitle = "Archives repository";
const archiveDescription = `One-off projects, logos, graphics.
Exploring random stuff.`;

export const Links = () => {
  return (
    <>
      <LinkBlock
        href="/profile"
        buttonLabel="Profile"
        title={profileName}
        description={profileDescription}
        className={styles.profileLinkBlock}
      />
      <LinkBlock
        href="/archives"
        buttonLabel="Archives"
        title={archiveTitle}
        description={archiveDescription}
        className={styles.archiveLinkBlock}
      />
    </>
  );
};
