import styles from './dateAndWeather.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import { replaceWithSpacesWhenHidden } from "@/utils/css";

interface WeatherProps {
  city: string;
  weather: string;
  hide?: boolean;
}

export const Weather = ({city, weather, hide}: WeatherProps) => {

  return (
    <div className={styles.container}>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 300 }} >{ replaceWithSpacesWhenHidden("Location", hide) }</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 300 }} className={styles.city} hovering={!hide}>{ replaceWithSpacesWhenHidden(city, hide) }</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 300 }} >{ replaceWithSpacesWhenHidden("Weather", hide) }</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 300 }} className={styles.city} hovering={!hide} >{ replaceWithSpacesWhenHidden(weather, hide) }</TextLine>
    </div>
  )
}