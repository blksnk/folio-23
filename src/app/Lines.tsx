import styles from './lines.module.sass'

const Lines = () => {
  return (
    <div className={ styles.lineContainer }>
      <div className={ styles.line }></div>
      <div className={ styles.line }></div>
      <div className={ styles.line }></div>
      <div className={ styles.line }></div>
      <div className={ styles.line }></div>
    </div>
  )
}

export default Lines
