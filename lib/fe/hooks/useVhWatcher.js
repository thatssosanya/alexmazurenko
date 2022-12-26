import { useEffect } from "react"

const useVhWatcher = () => {
  useEffect(() => {
    const setVhVariable = () => {
      document.documentElement.style.setProperty("--vh", `${ window.innerHeight / 100 }px`)
    }

    setVhVariable()
    window.addEventListener("resize", setVhVariable)
    window.addEventListener("orientationchange", setVhVariable)

    return () => {
      window.removeEventListener("resize", setVhVariable)
      window.removeEventListener("orientationchange", setVhVariable)
    }
  }, [])
}

export default useVhWatcher
