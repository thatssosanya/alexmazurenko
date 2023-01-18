import React, { useEffect, useState, useMemo } from "react"
import styled from "styled-components"

const FilterCheckboxes = ({ onChange }) => {
  const [showCommercial, setShowCommercial] = useState(true)
  const [showNonCommercial, setShowNonCommercial] = useState(false)
  const createToggle = (cur, other, setCur, setOther) => {
    return () => {
      if (cur) {
        if (other) {
          setCur(false)
        } else {
          setCur(false)
          setOther(true)
        }
      } else {
        setCur(true)
      }
    }
  }
  const states = useMemo(() => [{
    label: "Commercial",
    show: showCommercial,
    toggle: createToggle(showCommercial, showNonCommercial,
      setShowCommercial, setShowNonCommercial),
  }, {
    label: "Non-commercial",
    show: showNonCommercial,
    toggle: createToggle(showNonCommercial, showCommercial,
      setShowNonCommercial, setShowCommercial),
  }], [showCommercial, showNonCommercial])

  useEffect(() => {
    let filter = (projects) => {
      if (!showCommercial) {
        return projects.filter((project) => !project.commercial)
      }
      if (!showNonCommercial) {
        return projects.filter((project) => project.commercial)
      }
      return projects
    }
    onChange(filter)
  }, [showCommercial, showNonCommercial, onChange])

  return (
    <StyledContainer>
      {
        states.map(({ label, show, toggle }) => (
          <StyledLabel active={ show } key={ label }>
            <input
              type="checkbox"
              defaultChecked={ show }
              onChange={ toggle }
              hidden={ true}
            />
            { label }
          </StyledLabel>
        ))
      }
    </StyledContainer>
  )
}

const StyledLabel = styled.label`
  ${ ({ active }) => !active && `opacity: 0.4;` }
  cursor: pointer;
`

const StyledContainer = styled.div`
  font-size: 0.6em;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5em;
`

export default FilterCheckboxes