import { headers } from "next/headers"
import styles from './dateAndWeather.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";

export const Weather = () => {
  const headersList = headers()
  console.log(headersList)
  const city = headersList.get('x-request-city') ?? ""
  const weather = headersList.get('x-request-weather') ?? ""

  return (
    <div className={styles.container}>
      <TextLine animatedTextProps={{ fixedDuration: 150, delay: 800 }} >Location</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 1400 }} className={styles.city} active>{ city }</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 800 }} >Weather</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 2000 }}>{ weather }</TextLine>
    </div>
  )
}