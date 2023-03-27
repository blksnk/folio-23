'use client'

import { storage, storageKeys } from "../utils/localStorage"
import { useEffect } from "react";




export default function LocalStorageEffect() {
  useEffect(() => {
    // delete concurrentPageLoad from localstorage if present on first load
    storage.del(storageKeys.concurrentPageLoad.key);
    // it on page leave
  })


  return <></>
}