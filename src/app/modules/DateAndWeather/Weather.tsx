import styles from "./DateAndWeather.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import React from "react";

export type WeatherProps = {
  city: string;
  weather: string;
};

export const Weather = ({ city, weather }: WeatherProps) => {
  return (
    <div className={styles.weather}>
      <TextLine animatedTextProps={{ fixedDuration: 600, delay: 600 }}>
        Location
      </TextLine>
      <TextLine
        animatedTextProps={{ fixedDuration: 600, delay: 600 }}
        className={styles.city}
        hovering
      >
        {city}
      </TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 600, delay: 600 }}>
        Weather
      </TextLine>
      <TextLine
        animatedTextProps={{ fixedDuration: 600, delay: 600 }}
        className={styles.city}
        hovering
      >
        {weather}
      </TextLine>
    </div>
  );
};
