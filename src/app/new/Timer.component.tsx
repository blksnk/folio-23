"use client"

import { useEffect, useReducer } from "react";
import styles from './dateAndWeather.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";

const getDate = () => new Date(Date.now()).toString()
export const Timer = () => {
  const [datetime, update] = useReducer(getDate, null, () => '*** *** ** **** ******************')
  useEffect(() => {
    const intervalId = setInterval(update, 1000)

    return () => clearInterval(intervalId)
  })
  const words = datetime.split(" ")
  const date = words.slice(0, 4).join(" ")
  const time = words.slice(4, 6).join(" ")

  return (
    <div className={styles.dateTime}>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 100 }}>{ date }</TextLine>
      <TextLine animatedTextProps={{ fixedDuration: 300, delay: 100 }}>{ time }</TextLine>
    </div>
  )
}