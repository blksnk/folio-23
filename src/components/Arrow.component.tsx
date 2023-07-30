import styles from "@/app/page.module.sass";
import Image from "next/image";

interface ArrowProps {
  down?: boolean;
  disabled?: boolean;
}

export const Arrow = (props: ArrowProps) => {
  const klass = `${ styles.arrow } ${ props.down ? styles.arrowDown : "" } ${ props.disabled ? styles.arrowDisabled : "" }`
  return (
    <div className={ klass }>
      <Image
        src="/arrow.svg"
        alt={ "Arrow " + (props.down ? "Down" : "Up") }
        width={ 14 }
        height={ 12 }
      />
    </div>
  )
}