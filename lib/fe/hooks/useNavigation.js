import { useState, useEffect, useCallback, useMemo } from "react"
import Navigation from "../components/Navigation"

const useNavigation = (sections) => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null)
  const handleSetSelectedSectionIndex = useCallback((value) => 
    setSelectedSectionIndex(Math.min(Math.max(value, 0), sections.length - 1)
  ), [])

  useEffect(() => handleSetSelectedSectionIndex(0), [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const BACK = [37, 65, 38, 87]
      const NEXT = [39, 68, 40, 83]

      if (BACK.includes(e.keyCode)) {
        setSelectedSectionIndex(selectedSectionIndex - 1)
      } else if (NEXT.includes(e.keyCode)) {
        setSelectedSectionIndex(selectedSectionIndex + 1)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
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
