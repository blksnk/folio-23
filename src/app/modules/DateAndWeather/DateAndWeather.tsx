import { Timer } from "./Timer";
import { Weather, type WeatherProps } from "./Weather";
import styles from "./DateAndWeather.module.sass";

type DateAndWeather = {
  weatherProps: WeatherProps;
};

export const DateAndWeather = ({ weatherProps }: DateAndWeather) => {
  return (
    <section className={styles.dateAndWeather}>
      <Weather {...weatherProps} />
      <Timer />
    </section>
  );
};
