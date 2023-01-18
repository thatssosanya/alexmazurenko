import React, { useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import useThrottledCallback from "../hooks/useThrottledCallback"

const StyledNavigation = styled.div`
  position: fixed;
  bottom: 0;
  height: 1.8rem;
  width: 100%;
  mix-blend-mode: difference;
`

const StyledBorder = styled.div`
  height: 0.1rem;
  background: linear-gradient(
    90deg,
    rgba(0,255,255,1) 0%,
    rgba(0,0,255,1) 17%,
    rgba(255,0,255,1) 33%,
    rgba(255,0,0,1) 50%,
    rgba(255,255,0,1) 67%,
    rgba(0,255,0,1) 83%,
    rgba(0,255,255,1) 100%);
`

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  flex-shrink: 1;
  transition: opacity 0.7s;
  ${ ({ disabled }) => disabled && "opacity: 0; cursor: default;" };
`

const StyledItems = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
`

const StyledItem = styled.div`
  color: ${ ({ selected }) => selected? "#fff" : "#999" };
  margin: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 1s;
  cursor: pointer;

  @media (min-width: 320px) {
    margin: 0 0.4rem;
  }
`

const StyledTitle = styled.div`
  display: inline-block;
  overflow: hidden;
  font-family: "Montserrat";
  white-space: nowrap;
  transition: margin-left 0.7s, max-width 0.7s;
  margin-left: ${ ({ selected }) => selected ? "0.4rem" : "0" };
  max-width: ${ ({ selected }) => selected ? "100vw" : "0" };
  direction: ${ ({ selected }) => selected ? "ltr" : "rtl"};

  @media (max-width: 480px) {
    display: none;
  }
`

const Navigation = ({
  sections,
  selectedSectionIndex,
  setSelectedSectionIndex
}) => {
  const disableBack = !selectedSectionIndex || selectedSectionIndex === 0
  const disableNext = selectedSectionIndex === sections.length - 1

  const handleSetSelectedSectionIndex = useThrottledCallback((value) => {
    setSelectedSectionIndex(Math.min(Math.max(value, 0), sections.length - 1))
  }, 700, [sections])

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
      e.preventDefault()
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
      ['wheel', handleWheel, { passive: false }],
      ['touchstart', handleTouchStart],
      ['touchmove', handleTouchMove],
    ]
    handlers.forEach((data) => document.addEventListener(...data))
    return () =>
      handlers.forEach((data) => document.removeEventListener(...data))
  }, [selectedSectionIndex, handleSetSelectedSectionIndex])

  return (
    <StyledNavigation>
      <StyledBorder />
      <StyledContent>
        <StyledIcon
          icon={ ["fas", "angle-up"] }
          onClick={ () => setSelectedSectionIndex(selectedSectionIndex - 1) }
          disabled={ disableBack }
        />
        <StyledItems>
          {
            sections.map(({ icon, title }, i) => {
              const selected = i === selectedSectionIndex
              return (
                <StyledItem
                  onClick={ () => setSelectedSectionIndex(i) }
                  key={ i }
                  selected={ selected }
                >
                  <StyledIcon
                    icon={ icon }
                  />
                  {
                    title &&
                    <StyledTitle selected={ selected }>
                      { title }
                    </StyledTitle>
                  }
                </StyledItem>
              )
            })
          }
        </StyledItems>
        <StyledIcon
          icon={ ["fas", "angle-down"] }
          onClick={ () => setSelectedSectionIndex(selectedSectionIndex + 1) }
          disabled={ disableNext }
        />
      </StyledContent>
    </StyledNavigation>
  )
}

Navigation.propTypes = {
  sectionIconsAndTitles: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string
    })
  ),
  selectedSectionIndex: PropTypes.number,
  setSelectedSectionIndex: PropTypes.func
}

export default Navigation
