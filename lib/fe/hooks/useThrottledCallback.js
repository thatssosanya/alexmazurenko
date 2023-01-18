import { useRef, useCallback } from "react"

const useThrottledCallback = (callback, delay, depsList) => {
  const isThrottled = useRef(false)

  return useCallback((...args) => {
    if (isThrottled.current) {
      return
    }
    isThrottled.current = true
    callback(...args)
    setTimeout(() => isThrottled.current = false, delay)
  }, [callback, delay, ...depsList])
}

export default useThrottledCallback
