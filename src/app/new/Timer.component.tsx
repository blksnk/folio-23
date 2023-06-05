"use client"

import { useEffect, useReducer } from "react";
import styles from './dateAndWeather.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import { replaceWithSpacesWhenHidden } from "@/utils/css";

const getDate = () => new Date(Date.now()).toString()

interface TimerProps {
  hide?: boolean;
}

export const Timer = ({ hide }: TimerProps) => {
  const [datetime, update] = useReducer(getDate, null, () => '*** *** ** **** ******************')
  useEffect(() => {
    const intervalId = setInterval(update, 1000)

    return () => clearInterval(intervalId)
  })
  const words = datetime.split(" ")
  const date = replaceWithSpacesWhenHidden(words.slice(0, 4).join(" "), hide)
  const time = replaceWithSpacesWhenHidden(words.slice(4, 6).join(" "), hide)

  return (
    <div className={styles.dateTime}>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 100 }}>{ date }</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 100 }}>{ time }</TextLine>
    </div>
  )
}