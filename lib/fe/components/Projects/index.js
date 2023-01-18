import React, { useCallback, useEffect, useRef, useState } from "react"
import withSection from "../withSection"
import useThrottledCallback from "../../hooks/useThrottledCallback.js"
import Project from "./Project"
import PropTypes from "prop-types"
import styled from "styled-components"
import FilterCheckboxes from "./FilterCheckboxes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Projects = ({ projects }) => {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const handleSetSelectedProjectIndex = useThrottledCallback((value) => {
    setSelectedProjectIndex(Math.min(Math.max(0, value), filteredProjects.length - 1))
  }, 700, [filteredProjects])
  useEffect(() => setSelectedProjectIndex(0), [filteredProjects])

  const ref = useRef(null)

  useEffect(() => {
    const refCur = ref.current
    const handleWheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        e.stopPropagation()
        handleSetSelectedProjectIndex(selectedProjectIndex + 1)
      } else if (e.deltaY < 0) {
        e.stopPropagation()
        handleSetSelectedProjectIndex(selectedProjectIndex - 1)
      }
    }
    let startClientX = 0
    const handleTouchStart = (e) => {
      startClientX = e.touches[0].clientX
    }
    const handleTouchMove = (e) => {
      const { clientX } = e.touches[0]
      if (startClientX > clientX) {
        e.stopPropagation()
        handleSetSelectedProjectIndex(selectedProjectIndex + 1)
      } else if (startClientX < clientX) {
        e.stopPropagation()
        handleSetSelectedProjectIndex(selectedProjectIndex - 1)
      }
    }
    const handlers = [
      ['wheel', handleWheel],
      ['touchstart', handleTouchStart],
      ['touchmove', handleTouchMove],
    ]
    handlers.forEach((data) => refCur?.addEventListener(...data))
    return () =>
      handlers.forEach((data) => refCur?.removeEventListener(...data))
  }, [selectedProjectIndex, handleSetSelectedProjectIndex])

  const handleFiltersChange = useCallback((filter) => {
    setFilteredProjects(filter(projects))
    setSelectedProjectIndex(0)
  }, [projects])

  return (
    <div>
      <FilterCheckboxes
        projects={ projects }
        onChange={ handleFiltersChange }
      />
      <StyledContainer>
        <StyledIcon
          icon={ ["fas", "angle-left"] }
          onClick={ () => handleSetSelectedProjectIndex(selectedProjectIndex - 1) }
          disabled={ selectedProjectIndex === 0 }
        />
        <StyledCarousel ref={ ref }>
          {
            filteredProjects.map((project, i) => (
              <Project
                project={ project }
                selected={ i === selectedProjectIndex }
                key={ i }
              />
            ))
          }
        </StyledCarousel>
        <StyledIcon
          icon={ ["fas", "angle-right"] }
          onClick={ () => handleSetSelectedProjectIndex(selectedProjectIndex + 1) }
          disabled={ selectedProjectIndex === filteredProjects.length - 1 }
        />
      </StyledContainer>
    </div>
  )
}

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: opacity 0.3s;
  ${ ({ disabled }) => disabled && "opacity: 0; cursor: default;" }
`

const StyledCarousel = styled.div`
  font-size: 0.55em;
  margin: 0 0.5em;
  width: 18em;
  overflow: hidden;
  display: flex;
  align-items: stretch;
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      github: PropTypes.arrayOf(PropTypes.string),
      collaborators: PropTypes.arrayOf(PropTypes.string),
      when: PropTypes.string,
      description: PropTypes.string,
      frontend: PropTypes.arrayOf(PropTypes.string),
      backend: PropTypes.arrayOf(PropTypes.string),
      other: PropTypes.arrayOf(PropTypes.string),
    })
  )
}

export default withSection(Projects)
