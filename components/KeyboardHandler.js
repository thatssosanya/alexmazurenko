import React, { useEffect } from "react"
import PropTypes from "prop-types"

const KeyboardHandler = ({ selectedSectionIndex, setSelectedSectionIndex }) => {
  useEffect(() => {
    const handleKeyDownInner = (e, selectedSectionIndex, setSelectedSectionIndex) => {
      const BACK = [37, 65, 38, 87]
      const NEXT = [39, 68, 40, 83]

      if (BACK.includes(e.keyCode)) {
        setSelectedSectionIndex(selectedSectionIndex - 1)
      } else if (NEXT.includes(e.keyCode)) {
        setSelectedSectionIndex(selectedSectionIndex + 1)
      }
    }

    const handleKeyDown = (e) => handleKeyDownInner(e, selectedSectionIndex, setSelectedSectionIndex)

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedSectionIndex, setSelectedSectionIndex])

  return null
}

KeyboardHandler.propTypes = {
  selectedSectionIndex: PropTypes.number,
  setSelectedSectionIndex: PropTypes.func
}

export default KeyboardHandler
