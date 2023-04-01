import styles from './lines.module.sass'

interface LinesProps {
  animate?: boolean;
  lineX?: boolean;
}

const Lines = ({ animate, lineX }: LinesProps) => {
  const klass = `${styles.lineContainer} ${animate ? styles.animate : ''}`
  return (
    <div className={ klass }>
      { lineX && <div className={ `${styles.lineX} ${styles.lineNav}`}></div> }
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
