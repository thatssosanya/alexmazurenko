import { useRef, useCallback } from "react"

const useThrottledCallback = (callback, delay, depsList) => {
  const isSetThrottled = useRef(false)
  return useCallback((...args) => {
    if (isSetThrottled.current) {
      return
    }
    isSetThrottled.current = true
    callback(...args)
    setTimeout(() => isSetThrottled.current = false, delay)
  }, depsList)
}

export default useThrottledCallback
