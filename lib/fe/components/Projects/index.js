import React, { useEffect, useRef, useState, useMemo } from "react"
import withSection from "../withSection"
import useThrottledCallback from "../../hooks/useThrottledCallback.js"
import Project from "./Project"
import PropTypes from "prop-types"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

const StyledLabel = styled.label`
  ${ ({ active }) => !active && `opacity: 0.4;` }
  cursor: pointer;
`

const StyledCarouselContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledCheckboxesContainer = styled.div`
  font-size: 0.6em;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5em;
`

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
  }, [showCommercial, showNonCommercial])

  return (
    <StyledCheckboxesContainer>
      {
        states.map(({ label, show, toggle }) => (
          <StyledLabel active={ show }>
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
    </StyledCheckboxesContainer>
  )
}

const Projects = ({ projects }) => {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const handleSetSelectedProjectIndex = useThrottledCallback((value) => {
    setSelectedProjectIndex(Math.min(Math.max(value, 0), filteredProjects.length - 1))
  }, 700, [filteredProjects])
  useEffect(() => setSelectedProjectIndex(0), [filteredProjects])

  const ref = useRef(null)

  useEffect(() => {
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
    handlers.forEach((data) => ref.current?.addEventListener(...data))
    return () =>
      handlers.forEach((data) => ref.current?.removeEventListener(...data))
  }, [selectedProjectIndex, handleSetSelectedProjectIndex])

  return (
    <div>
      <FilterCheckboxes
        projects={ projects }
        onChange={ (filter) => {
          setFilteredProjects(filter(projects))
          setSelectedProjectIndex(0)
        } }
      />
      <StyledCarouselContainer>
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
      </StyledCarouselContainer>
    </div>
  )
}

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
