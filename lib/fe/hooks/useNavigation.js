import { useState, useEffect, useMemo } from "react"
import Navigation from "../components/Navigation"
import useThrottledCallback from "./useThrottledCallback"

const useNavigation = (sections) => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null)

  const handleSetSelectedSectionIndex = useThrottledCallback((value) =>
    setSelectedSectionIndex(Math.min(Math.max(value, 0), sections.length - 1)),
    700,
  [sections])

  useEffect(() => handleSetSelectedSectionIndex(0), [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const next = [39, 40, 68, 83]
      const back = [37, 38, 65, 87]
      if (next.includes(e.keyCode)) {
        handleSetSelectedSectionIndex(selectedSectionIndex + 1)
      } else if (back.includes(e.keyCode)) {
        handleSetSelectedSectionIndex(selectedSectionIndex - 1)
      }
    }
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleSetSelectedSectionIndex(selectedSectionIndex + 1)
      } else if (e.deltaY < 0) {
        handleSetSelectedSectionIndex(selectedSectionIndex - 1)
      }
    }
    let startClientY = 0
    const handleTouchStart = (e) => {
      startClientY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      const { clientY } = e.touches[0]
      if (startClientY > clientY) {
        handleSetSelectedSectionIndex(selectedSectionIndex + 1)
      } else if (startClientY < clientY) {
        handleSetSelectedSectionIndex(selectedSectionIndex - 1)
      }
    }
    const handlers = [
      ['keydown', handleKeyDown],
      ['wheel', handleWheel],
      ['touchstart', handleTouchStart],
      ['touchmove', handleTouchMove],
    ]
    handlers.forEach((data) => document.addEventListener(...data))
    return () =>
      handlers.forEach((data) => document.removeEventListener(...data))
  }, [selectedSectionIndex, handleSetSelectedSectionIndex])

  const Nav = useMemo(() =>
    <Navigation
      sections={ sections }
      selectedSectionIndex={ selectedSectionIndex }
      setSelectedSectionIndex={ handleSetSelectedSectionIndex }/>
  , [sections, selectedSectionIndex, handleSetSelectedSectionIndex])

  return [Nav, selectedSectionIndex]
}

export default useNavigation
