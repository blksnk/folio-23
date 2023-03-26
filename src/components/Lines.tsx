import styles from './lines.module.sass'

interface LinesProps {
  animate?: boolean;
}

const Lines = ({ animate }: LinesProps) => {
  const klass = `${styles.lineContainer} ${animate ? styles.animate : ''}`
  return (
    <div className={ klass }>
      <div className={styles.lineX} id={styles.lineTop}></div>
      <div className={styles.lineContainerY}>
        <div className={ styles.lineY }></div>
      </div>
      <div className={styles.lineContainerY}>
        <div className={ styles.lineY }></div>
      </div>
      <div className={styles.lineContainerY}>
        <div className={ styles.lineY }></div>
      </div>
      <div className={styles.lineContainerY}>
        <div className={ styles.lineY }></div>
      </div>
      <div className={styles.lineContainerY}>
        <div className={ styles.lineY }></div>
      </div>
    </div>
  )
}

export default Lines
